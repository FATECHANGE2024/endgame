import React, { FormEvent, useEffect } from 'react';
import { Modal } from 'bootstrap';
import '@/app/citizen/citizen.css';

const ReportModal: React.FC = () => {
  useEffect(() => {
    // Initialize Modal if not already
    const reportModalElement = document.getElementById('reportModal');
    if (reportModalElement && !Modal.getInstance(reportModalElement)) {
      new Modal(reportModalElement);
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert('Issue reported successfully!');
    const reportModalEl = document.getElementById('reportModal');
    if (reportModalEl) {
      const reportModal = Modal.getInstance(reportModalEl);
      if (reportModal) reportModal.hide();
    }
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  return (
    <div className="modal fade" id="reportModal" tabIndex={-1} aria-labelledby="reportModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0">
            <h5 className="modal-title" id="reportModalLabel">Report a New Issue</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form id="reportIssueForm" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="issueType" className="form-label">Type of Issue</label>
                <select className="form-select" id="issueType" required>
                  <option selected disabled value="">Choose...</option>
                  <option>Pothole</option>
                  <option>Broken Streetlight</option>
                  <option>Garbage</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="issueLocation" className="form-label">Location</label>
                <input type="text" className="form-control" id="issueLocation" placeholder="e.g., Near Main Market, Sector 5" required />
              </div>
              <div className="mb-3">
                <label htmlFor="issueDescription" className="form-label">Description</label>
                <textarea className="form-control" id="issueDescription" rows={3} required></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="issuePhoto" className="form-label">Upload Photo (Optional)</label>
                <input className="form-control" type="file" id="issuePhoto" accept="image/*" />
              </div>
              <div className="modal-footer border-0">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Submit Report</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
