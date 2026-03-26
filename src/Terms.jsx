import React, { useEffect } from 'react';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="terms-page" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '40px' }}>
          <span className="section-badge">Policy</span>
          <h1>Terms & <span className="text-gradient">Conditions</span></h1>
          <p>Last updated: March 26, 2026</p>
        </div>

        <div className="content-card" style={{ maxWidth: '850px', color: 'var(--text-1)' }}>
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>1. Use of Service</h2>
            <p style={{ color: 'var(--text-2)', marginBottom: '12px' }}>
              By accessing FluentEdge, you agree to comply with our user policies and standards of conduct. Our platform is for educational use.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>2. Accounts & Security</h2>
            <p style={{ color: 'var(--text-2)', marginBottom: '12px' }}>
              We use Google Sign-In for secure access. Users are responsible for maintaining the privacy of their accounts and registered credentials.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>3. Content & Intellectual Property</h2>
            <p style={{ color: 'var(--text-2)', marginBottom: '12px' }}>
              All course content, videos, tasks, and certificates produced by FluentEdge are the intellectual property of FluentEdge and cannot be redistributed without prior permission.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>4. Payment Terms</h2>
            <p style={{ color: 'var(--text-2)', marginBottom: '12px' }}>
              All payments for the programs must be made upfront via the payment gateway provided in the app. We use Razorpay to process all transactions securely. Failure to complete payment will result in the suspension of access to premium features.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>5. Limitation of Liability</h2>
            <p style={{ color: 'var(--text-2)', marginBottom: '12px' }}>
              FluentEdge is not liable for any service interruptions caused by 3rd party providers, internet issues, or device-specific problems that prevent you from attending a live class or completing a task.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>6. Termination</h2>
            <p style={{ color: 'var(--text-2)' }}>
              We reserve the right to suspend any account that violates our standards or misses tasks across several weeks, as per our discipline guidelines.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
