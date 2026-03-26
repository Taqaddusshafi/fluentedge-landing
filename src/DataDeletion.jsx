import React, { useEffect } from 'react';

const DataDeletion = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="data-deletion-page" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '40px' }}>
          <span className="section-badge" style={{ backgroundColor: 'rgba(234, 67, 53, 0.1)', color: '#EA4335' }}>Data Management</span>
          <h1>Data <span className="text-gradient">Deletion</span> Request</h1>
          <p>We value your privacy and provide a simple way to manage your account and data.</p>
        </div>

        <div className="content-card" style={{ 
          maxWidth: '800px', 
          background: 'var(--surface)', 
          padding: '40px', 
          borderRadius: 'var(--radius)', 
          border: '1px solid var(--divider)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>How to Delete Your Account?</h2>
            <p style={{ color: 'var(--text-2)', lineHeight: '1.7' }}>
              If you wish to delete your FluentEdge account and all associated data, please follow the steps below. 
              Once your request is processed, all your personal information, including your progress, certificates, 
              and XP, will be permanently removed from our servers.
            </p>
          </div>

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '20px',
            marginBottom: '40px'
          }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: 'var(--color-primary)', 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0,
                fontWeight: '700'
              }}>1</div>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Send an Email</h3>
                <p style={{ color: 'var(--text-2)', fontSize: '0.95rem' }}>
                  Write to us at <strong>support@thefluentedge.in</strong> from your registered email address.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: 'var(--color-primary)', 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0,
                fontWeight: '700'
              }}>2</div>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Subject Line</h3>
                <p style={{ color: 'var(--text-2)', fontSize: '0.95rem' }}>
                  Use the subject line: <strong>"Data Deletion Request - [Your Registered Mobile Number]"</strong>.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: 'var(--color-primary)', 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0,
                fontWeight: '700'
              }}>3</div>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Processing</h3>
                <p style={{ color: 'var(--text-2)', fontSize: '0.95rem' }}>
                  Our team will process your request within 48–72 hours and confirm once your data is permanently deleted.
                </p>
              </div>
            </div>
          </div>

          <div style={{ 
            background: 'var(--color-primary-light)', 
            padding: '24px', 
            borderRadius: 'var(--radius-sm)', 
            border: '1px solid var(--color-primary)',
            textAlign: 'center'
          }}>
            <p style={{ marginBottom: '16px', fontWeight: '600', color: 'var(--color-primary-dark)' }}>Ready to send the request?</p>
            <a href="mailto:support@thefluentedge.in?subject=Data Deletion Request" className="btn btn-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Compose Deletion Email
            </a>
          </div>

          <p style={{ marginTop: '32px', fontSize: '0.85rem', color: 'var(--text-3)', textAlign: 'center' }}>
            Note: Once deleted, account recovery is not possible. If you have an active subscription, it will also be terminated.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataDeletion;
