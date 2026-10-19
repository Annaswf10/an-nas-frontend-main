import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Activities = () => {
  const { t } = useTranslation();
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/activities")
      .then((response) => {
        if (response.data.data) {
          setActivities(response.data.data);
        } else if (response.data.activities) {
          setActivities(response.data.activities);
        } else if (Array.isArray(response.data)) {
          setActivities(response.data);
        }
      })
      .catch((error) => console.error("Error fetching activities:", error));
  }, []);

  // ছবির সঠিক লিংক তৈরি করার ফাংশন
  const getImageUrl = (imagePath) => {
    if (!imagePath)
      return "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
    if (imagePath.startsWith("http")) return imagePath;

    // ডাটাবেসে যদি 'uploads/' সহ সেভ হয়, তবে ডাবল ফোল্ডার হওয়া ঠেকাবে
    if (imagePath.startsWith("uploads/"))
      return `http://localhost:5000/${imagePath}`;
    if (imagePath.startsWith("uploads\\"))
      return `http://localhost:5000/${imagePath.replace("\\", "/")}`;

    return `http://localhost:5000/uploads/${imagePath}`;
  };

  return (
    <main className="bg-light pb-5 min-vh-100">
      {/* Header Section */}
      <header
        className="page-header d-flex align-items-center mb-5"
        style={{
          background:
            "linear-gradient(rgba(0, 106, 78, 0.85), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') center/cover",
          height: "300px",
        }}
      >
        <div className="container text-center text-white">
          <h1 className="display-4 fw-bold">
            {t("act_header_title", "Our Recent Activities")}
          </h1>
          <p className="lead mx-auto mt-2" style={{ maxWidth: "700px" }}>
            {t(
              "act_header_sub",
              "মাঠ পর্যায়ে আমাদের স্বেচ্ছাসেবকদের নিরলস পরিশ্রম ও কার্যক্রম সম্পর্কে জানুন।"
            )}
          </p>
        </div>
      </header>

      {/* Activities Grid */}
      <div className="container">
        <div className="row g-4">
          {activities.map((activity) => (
            <div key={activity.id} className="col-md-6 col-lg-4">
              <div
                className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden"
                style={{ transition: "transform 0.3s ease", cursor: "pointer" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                {/* Image Container */}
                <div className="position-relative">
                  <img
                    src={getImageUrl(activity.image || activity.img)}
                    alt={activity.title}
                    className="card-img-top"
                    style={{ height: "240px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  {/* Date Badge */}
                  <div
                    className="position-absolute top-0 end-0 bg-success text-white px-3 py-1 m-3 rounded-pill fw-semibold shadow-sm"
                    style={{ fontSize: "0.85rem", backgroundColor: "#006a4e" }}
                  >
                    <i className="fa-regular fa-calendar me-2"></i>
                    {activity.date ||
                      new Date(activity.created_at).toLocaleDateString()}
                  </div>
                </div>

                <div className="card-body p-4 d-flex flex-column">
                  <h5
                    className="fw-bold mb-3 theme-text"
                    style={{ color: "#006a4e", lineHeight: "1.4" }}
                  >
                    {activity.title}
                  </h5>

                  {/* Description with Line Clamp */}
                  <div
                    className="text-muted mb-4 flex-grow-1"
                    style={{
                      fontSize: "0.95rem",
                      textAlign: "justify",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: activity.description || activity.desc,
                    }}
                  />

                  {/* Details Button */}
                  <button
                    onClick={() => setSelectedActivity(activity)}
                    className="btn w-100 py-2 fw-bold mt-auto rounded-3 text-success"
                    style={{ border: "2px solid #006a4e" }}
                    data-bs-toggle="modal"
                    data-bs-target="#activityDetailsModal"
                  >
                    {t("act_btn_read_more", "Details")}{" "}
                    <i className="fa-solid fa-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {activities.length === 0 && (
            <div className="col-12 text-center py-5">
              <div className="p-5 bg-white rounded-4 shadow-sm border">
                <i
                  className="fa-solid fa-folder-open text-muted mb-3"
                  style={{ fontSize: "3rem" }}
                ></i>
                <h4 className="text-muted fw-bold">
                  কোনো কার্যক্রম পাওয়া যায়নি।
                </h4>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Activity Details Modal */}
      <div
        className="modal fade"
        id="activityDetailsModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
            {selectedActivity && (
              <>
                {/* Modal Image Header */}
                <div className="position-relative" style={{ height: "350px" }}>
                  <img
                    src={getImageUrl(
                      selectedActivity.image || selectedActivity.img
                    )}
                    alt={selectedActivity.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <button
                    type="button"
                    className="btn-close position-absolute top-0 end-0 m-3 bg-white rounded-circle p-2 shadow"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                {/* Modal Body */}
                <div className="modal-body p-4 p-md-5 bg-white">
                  <div className="d-flex align-items-center mb-3">
                    <span
                      className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2 fw-semibold"
                      style={{ color: "#006a4e" }}
                    >
                      <i className="fa-regular fa-calendar me-2"></i>
                      {selectedActivity.date ||
                        new Date(
                          selectedActivity.created_at
                        ).toLocaleDateString()}
                    </span>
                  </div>

                  <h2 className="fw-bold mb-4" style={{ color: "#006a4e" }}>
                    {selectedActivity.title}
                  </h2>

                  <div
                    className="text-muted"
                    style={{
                      fontSize: "1.1rem",
                      lineHeight: "1.8",
                      textAlign: "justify",
                    }}
                    dangerouslySetInnerHTML={{
                      __html:
                        selectedActivity.description || selectedActivity.desc,
                    }}
                  />
                </div>

                {/* Modal Footer */}
                <div className="modal-footer border-top-0 bg-light p-4 d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary px-4 fw-bold rounded-pill"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn px-4 fw-bold rounded-pill text-white shadow-sm"
                    style={{ backgroundColor: "#F5A623" }}
                    data-bs-dismiss="modal"
                    onClick={() => (window.location.href = "/donation")}
                  >
                    <i className="fa-solid fa-hand-holding-dollar me-2"></i>{" "}
                    Donate Now
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Activities;