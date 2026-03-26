import React, { useEffect } from 'react';

const Refund = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="refund-page" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '40px' }}>
          <span className="section-badge">Billing</span>
          <h1>Refund & <span className="text-gradient">Cancellation</span></h1>
          <p>Last updated: March 26, 2026</p>
        </div>

        <div className="content-card" style={{ maxWidth: '850px', color: 'var(--text-1)' }}>
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>1. Digital Services Policy</h2>
            <p style={{ color: 'var(--text-2)', marginBottom: '12px' }}>
              At FluentEdge, we offer digital services, including live classes and structured training materials. Since these services are digital products and are delivered immediately or upon payment, <strong>we generally do not offer refunds once a user has gained access to the program materials or attended a live session.</strong>
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>2. Cancellation of Subscription</h2>
            <p style={{ color: 'var(--text-2)', marginBottom: '12px' }}>
              Users may choose not to renew their subscription for the next billing cycle. However, no refunds will be provided for the current billing period or any partially used subscription term.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>3. Disputes & Discrepancies</h2>
            <p style={{ color: 'var(--text-2)', marginBottom: '12px' }}>
              In case of duplicate payments or technical issues where a service was not delivered despite a successful payment, please contact us at <strong>support@thefluentedge.in</strong> with your Razorpay Payment ID. We will investigate and process a refund if the discrepancy is verified, which may take 5–7 working days to reflect in your account.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>4. Shipping & Delivery</h2>
            <p style={{ color: 'var(--text-2)', marginBottom: '12px' }}>
              We deal exclusively in digital content. No physical goods will be shipped. Access to the purchased program is granted instantly upon successful payment through the mobile app.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>5. Contact for Billing</h2>
            <p style={{ color: 'var(--text-2)' }}>
              For any payment-related queries, reach out to us at:<br />
              <strong>Email:</strong> support@thefluentedge.in<br />
              <strong>Address:</strong> Baramulla, Jammu & Kashmir, 193101
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Refund;
