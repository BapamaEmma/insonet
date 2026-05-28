import { useEffect, useState } from "react";
import { api } from "../../api/client";

export default function AdminContactPage() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    api.getContent().then((content) => setSubmissions(content.contactSubmissions ?? []));
  }, []);

  return (
    <>
      <div className="admin-header">
        <h2>Contact Inbox</h2>
      </div>
      <div className="admin-card">
        {submissions.length === 0 ? (
          <p style={{ color: "#64748b" }}>No contact form submissions yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((item) => (
                <tr key={item.id}>
                  <td>{new Date(item.createdAt).toLocaleString()}</td>
                  <td>{item.firstName} {item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.phone || "-"}</td>
                  <td>{item.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
