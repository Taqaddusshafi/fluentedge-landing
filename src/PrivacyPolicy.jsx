import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-page" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '40px' }}>
          <span className="section-badge">Legal</span>
          <h1>Privacy <span className="text-gradient">Policy</span></h1>
          <p>Last updated: March 26, 2026</p>
        </div>

        <div className="privacy-content" style={{ maxWidth: '800px', fontSize: '1.05rem', color: 'var(--text-1)' }}>
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '1.8rem' }}>1. Introduction</h2>
            <p style={{ marginBottom: '16px', color: 'var(--text-2)' }}>
              Welcome to FluentEdge. We are committed to protecting your personal information and your right to privacy. 
              If you have any questions or concerns about our policy, or our practices with regards to your personal information, 
              please contact us at <strong>support@thefluentedge.in</strong>.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '1.8rem' }}>2. Information We Collect</h2>
            <p style={{ marginBottom: '16px', color: 'var(--text-2)' }}>
              We collect personal information that you voluntarily provide to us when registering at the App, 
              expressing an interest in obtaining information about us or our products and services, or otherwise contacting us.
            </p>
            <ul style={{ listStyle: 'disc', marginLeft: '20px', color: 'var(--text-2)', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}><strong>Personal Identifiers:</strong> Name, email address, and mobile number.</li>
              <li style={{ marginBottom: '8px' }}><strong>Credentials:</strong> We use Google Sign-In for authentication. We do not store your Google password; we only receive an identity token to verify your account.</li>
              <li style={{ marginBottom: '8px' }}><strong>App Usage Data:</strong> Information about your progress, task submissions, exam results, and attendance to provide personalized learning analytics.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '1.8rem' }}>3. How We Use Your Information</h2>
            <p style={{ marginBottom: '16px', color: 'var(--text-2)' }}>
              We use the information we collect or receive:
            </p>
            <ul style={{ listStyle: 'disc', marginLeft: '20px', color: 'var(--text-2)', marginBottom: '16px' }}>
              <li style={{ marginBottom: '8px' }}>To facilitate account creation and logon process.</li>
              <li style={{ marginBottom: '8px' }}>To send you administrative information, such as program updates and notifications.</li>
              <li style={{ marginBottom: '8px' }}>To manage user accounts and provide educational services.</li>
              <li style={{ marginBottom: '8px' }}>To respond to user inquiries and offer support.</li>
              <li style={{ marginBottom: '8px' }}>To track your learning progress and issue certificates.</li>
            </ul>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '1.8rem' }}>4. Data Security</h2>
            <p style={{ marginBottom: '16px', color: 'var(--text-2)' }}>
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. 
              However, please also remember that we cannot guarantee that the internet itself is 100% secure. 
              Although we will do our best to protect your personal information, transmission of personal information to and from our App is at your own risk.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '1.8rem' }}>5. Your Privacy Rights</h2>
            <p style={{ marginBottom: '16px', color: 'var(--text-2)' }}>
              In some regions (like the EEA or UK), you have certain rights under applicable data protection laws. 
              These may include the right (i) to request access and obtain a copy of your personal information, 
              (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; 
              and (iv) if applicable, to data portability.
            </p>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '1.8rem' }}>6. Contact Us</h2>
            <p style={{ marginBottom: '16px', color: 'var(--text-2)' }}>
              If you have questions or comments about this policy, you may email us at:
            </p>
            <div style={{ 
              background: 'var(--color-primary-light)', 
              padding: '20px', 
              borderRadius: 'var(--radius-sm)', 
              borderLeft: '4px solid var(--color-primary)',
              fontWeight: '600',
              color: 'var(--color-primary-dark)'
            }}>
              Email: support@thefluentedge.in<br />
              Subject: Privacy Inquiry
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
