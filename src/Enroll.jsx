import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;

console.log("Debug Variables (should not be undefined):", {
  url: SUPABASE_URL ? "Loaded" : "Missing",
  anon: SUPABASE_ANON_KEY ? "Loaded" : "Missing",
  rzp: RAZORPAY_KEY ? "Loaded" : "Missing"
});

const FALLBACK_PROGRAMS = [
  { id: 'beginner', name: 'Beginner', price: 999, original_price: 1999 },
  { id: 'intermediate', name: 'Intermediate', price: 1499, original_price: 2499 },
  { id: 'advanced', name: 'Advanced', price: 1999, original_price: 3499 }
];

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Enroll() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialProgram = queryParams.get('program') || 'beginner';

  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [verifiedProfile, setVerifiedProfile] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/programs?select=*`, {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          // Map to match our UI format
          const formattedPrograms = data.map(p => ({
            id: p.level,
            name: p.name,
            price: p.price,
            original_price: p.original_price,
            level: p.level
          })).sort((a, b) => {
            const order = { beginner: 0, intermediate: 1, advanced: 2 };
            return (order[a.level] || 0) - (order[b.level] || 0);
          });
          setPrograms(formattedPrograms);
          
          const match = formattedPrograms.find(p => p.id === initialProgram);
          setSelectedProgram(match || formattedPrograms[0]);
        } else {
          setPrograms(FALLBACK_PROGRAMS);
          setSelectedProgram(FALLBACK_PROGRAMS.find(p => p.id === initialProgram) || FALLBACK_PROGRAMS[0]);
        }
      } catch (e) {
        setPrograms(FALLBACK_PROGRAMS);
        setSelectedProgram(FALLBACK_PROGRAMS.find(p => p.id === initialProgram) || FALLBACK_PROGRAMS[0]);
      } finally {
        setPageLoading(false);
      }
    };
    fetchPrograms();
  }, [initialProgram]);

  const verifyUser = async () => {
    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/verify-user`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({ phone, email })
      });
      const data = await response.json();
      return data;
    } catch {
      return { error: 'Failed to connect to verification server' };
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      setError('Please fill in your name, email, and phone number.');
      return;
    }
    if (phone.length < 10) {
      setError('Please enter a valid phone number.');
      return;
    }
    
    setLoading(true);
    setError('');

    // Step 1: Verify the user exists in the database
    const verification = await verifyUser();
    
    if (verification.error) {
      setError(verification.error);
      setLoading(false);
      return;
    }
    
    if (!verification.exists) {
      setError('No details found! Please log in or create an account in the FluentEdge app first before proceeding with payment.');
      setLoading(false);
      return;
    }

    setVerifiedProfile(verification.profile);
    setLoading(false);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!verifiedProfile) return;

    setLoading(true);
    setError('');

    // Step 2: Load Razorpay
    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      setError('Razorpay SDK failed to load. Are you offline?');
      setLoading(false);
      return;
    }

    try {
      // Step 3: Create order
      const callOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          amount: selectedProgram.price,
          receipt: `rcpt_${phone}_${Date.now().toString().slice(-6)}`,
          notes: {
            student_id: verifiedProfile.id,
            program_level: selectedProgram.id,
            student_name: name,
            phone: phone
          }
        }),
      };

      const res = await fetch(`${SUPABASE_URL}/functions/v1/create-razorpay-order`, callOptions);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create order');
      }

      // Diagnostic check exactly for the issue
      const frontendPrefix = RAZORPAY_KEY.substring(0, 12);
      if (data.backend_key_prefix && data.backend_key_prefix !== frontendPrefix) {
        throw new Error(`CRITICAL MISMATCH: Netlify key starts with ${frontendPrefix} but Supabase Edge Function used a key starting with ${data.backend_key_prefix}. The Live/Test keys must match exactly!`);
      }

      // Step 4: Open Razorpay Checkout
      const options = {
        key: RAZORPAY_KEY,
        amount: data.amount,
        currency: data.currency,
        name: 'FluentEdge',
        description: `Enrollment in ${selectedProgram.name}`,
        image: 'https://thefluentedge.in/favicon.svg',
        order_id: data.id,
        handler: function (response) {
          setSuccess(true);
        },
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
        theme: {
          color: '#0077FF',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response) {
        setError(response.error.description);
      });
      paymentObject.open();
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="section section-alt" style={{ display: 'flex', justifyContent: 'center', minHeight: '60vh', alignItems: 'center' }}>
        <p>Loading programs...</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="section container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: 520, padding: 40, background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--divider)', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--color-secondary-light)', color: 'var(--color-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 40 }}>
            ✓
          </div>
          <h2 style={{ marginBottom: 16 }}>Enrollment Successful!</h2>
          <p style={{ color: 'var(--text-2)', marginBottom: 24, lineHeight: 1.6 }}>
            Thank you for enrolling in the <strong>{selectedProgram?.name}</strong> program. Your payment was verified correctly.
          </p>
          <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '8px', marginBottom: '24px', textAlign: 'left' }}>
            <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 8 }}><strong>What`&apos;`s next?</strong></p>
            <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 8 }}>1. Open the FluentEdge app on your mobile device.</p>
            <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 8 }}>2. Make sure you are logged in with the number <strong>{phone}</strong>.</p>
            <p style={{ fontSize: 13, color: 'var(--text-2)' }}>3. Your program access has been unlocked and you can view tasks, classes, and exams instantly!</p>
          </div>
          <a href="/" className="btn btn-primary btn-block" style={{ justifyContent: 'center' }}>
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="section section-alt">
      <div className="container">
        <div className="section-header" style={{ marginBottom: 40 }}>
          <span className="section-badge">Enrollment</span>
          <h2>Complete Your <span className="text-gradient">Registration</span></h2>
          <p>Please enter your registered details. We will link your payment directly to your account.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', maxWidth: 900, margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {programs.map(prog => (
              <div 
                key={prog.id}
                onClick={() => setSelectedProgram(prog)}
                style={{ 
                  padding: 20, 
                  borderRadius: 'var(--radius)', 
                  border: `2px solid ${selectedProgram?.id === prog.id ? 'var(--color-primary)' : 'var(--divider)'}`,
                  cursor: 'pointer',
                  background: 'var(--surface)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.2s',
                  boxShadow: selectedProgram?.id === prog.id ? 'var(--shadow-md)' : 'none'
                }}
              >
                {selectedProgram?.id === prog.id && (
                  <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--color-primary)', color: 'white', padding: '4px 12px', borderBottomLeftRadius: 'var(--radius)', fontSize: 12, fontWeight: 700 }}>
                    Selected
                  </div>
                )}
                <h3 style={{ fontSize: 17, marginBottom: 8 }}>{prog.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 24, fontWeight: 800 }}>₹{prog.price}</span>
                  <span style={{ fontSize: 14, textDecoration: 'line-through', color: 'var(--text-3)' }}>₹{prog.original_price}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--surface)', padding: 32, borderRadius: 'var(--radius)', border: '1px solid var(--divider)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: 20, marginBottom: 8 }}>Student Details</h3>
            <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 24 }}>Your details must match the ones you used to create your FluentEdge account.</p>
            
            {error && (
              <div style={{ background: '#FFF3F3', color: 'var(--color-error)', padding: '12px 16px', borderRadius: '8px', marginBottom: 24, fontSize: 14, fontWeight: 500, border: '1px solid #FFE0E0' }}>
                {error}
              </div>
            )}

            {verifiedProfile && (
              <div style={{ background: '#F0FFF4', color: '#008A27', padding: '12px 16px', borderRadius: '8px', marginBottom: 24, fontSize: 14, fontWeight: 600, border: '1px solid #C6F6D5', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                Details Matched! Account Found.
              </div>
            )}

            <form onSubmit={verifiedProfile ? handlePayment : handleVerify}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>Registered Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your full name"
                  disabled={!!verifiedProfile}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--divider)', fontSize: 16, fontFamily: 'var(--font)', backgroundColor: verifiedProfile ? 'var(--bg)' : 'transparent' }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>Registered Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  disabled={!!verifiedProfile}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--divider)', fontSize: 16, fontFamily: 'var(--font)', backgroundColor: verifiedProfile ? 'var(--bg)' : 'transparent' }}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>Registered Phone Number</label>
                <div style={{ display: 'flex', alignItems: 'stretch' }}>
                  <div style={{ padding: '12px 16px', background: 'var(--bg)', border: '1px solid var(--divider)', borderRight: 'none', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px', color: 'var(--text-2)', display: 'flex', alignItems: 'center' }}>
                    +91
                  </div>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, '').substring(0, 10))}
                    placeholder="Enter 10-digit number"
                    disabled={!!verifiedProfile}
                    style={{ flex: 1, padding: '12px 16px', borderRadius: '0 8px 8px 0', border: '1px solid var(--divider)', fontSize: 16, fontFamily: 'var(--font)', backgroundColor: verifiedProfile ? 'var(--bg)' : 'transparent' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderTop: '1px solid var(--divider)', marginBottom: 24 }}>
                <span style={{ fontSize: 16, fontWeight: 500, color: 'var(--text-2)' }}>Total Amount</span>
                <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-1)' }}>₹{selectedProgram?.price}</span>
              </div>

              {!verifiedProfile ? (
                 <button 
                   type="submit" 
                   className="btn btn-outline btn-block" 
                   disabled={loading}
                   style={{ justifyContent: 'center', padding: '16px', fontSize: 16, borderWidth: '2px', borderColor: 'var(--color-primary)' }}
                 >
                   {loading ? 'Searching...' : '1. Verify Detail Match'}
                 </button>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-block" 
                    disabled={loading}
                    style={{ justifyContent: 'center', padding: '16px', fontSize: 18 }}
                  >
                    {loading ? 'Processing...' : `2. Pay ₹${selectedProgram?.price} Securely`}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setVerifiedProfile(null)}
                    style={{ background: 'none', border: 'none', color: 'var(--color-primary)', textDecoration: 'underline', cursor: 'pointer', fontSize: 14 }}
                  >
                    Change Details
                  </button>
                </div>
              )}
              
              <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'var(--text-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
                Secured by Razorpay
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
