import { useState, useRef } from 'react';

function CustomerReview() {
  // ===== CONTROLLED FORM STATE =====
  const [formData, setFormData] = useState({
    name: '',
    rating: '5',
    buyAgain: false,
    message: '',
  });

  const [submittedReview, setSubmittedReview] = useState(null);
  const [messageError, setMessageError] = useState('');

  // ===== UNCONTROLLED FORM REFS =====
  const nameRef = useRef(null);
  const divisionRef = useRef(null);
  const messageRef = useRef(null);
  const [submittedDivisionData, setSubmittedDivisionData] = useState(null);

  // Handle controlled form input change
  const handleControlledChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Validate message length
    if (name === 'message') {
      if (value.length > 25) {
        setMessageError(`Message exceeds 25 characters (${value.length}/25)`);
      } else {
        setMessageError('');
      }
    }
  };

  // Handle controlled form submit
  const handleControlledSubmit = (e) => {
    e.preventDefault();

    if (formData.message.length > 25) {
      setMessageError('Message must be less than 25 characters!');
      return;
    }

    setSubmittedReview({
      name: formData.name,
      rating: formData.rating,
      buyAgain: formData.buyAgain,
      message: formData.message,
    });

    // Reset form
    setFormData({
      name: '',
      rating: '5',
      buyAgain: false,
      message: '',
    });
    setMessageError('');
  };

  // Handle uncontrolled form submit
  const handleUncontrolledSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: nameRef.current.value,
      division: divisionRef.current.value,
      message: messageRef.current.value,
    };

    setSubmittedDivisionData(data);

    // Reset form
    nameRef.current.value = '';
    divisionRef.current.value = 'A';
    messageRef.current.value = '';
  };

  return (
    <section>
      <div className="section-heading">
        <p className="eyebrow">Customer Feedback</p>
        <h2>Share your experience with FurniCraft</h2>
      </div>

      {/* ===== CONTROLLED FORM ===== */}
      <div className="form-container">
        <h3>Controlled Form (Using useState)</h3>
        <form onSubmit={handleControlledSubmit} className="review-form">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleControlledChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating (Out of 5)</label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleControlledChange}
            >
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="buyAgain"
                checked={formData.buyAgain}
                onChange={handleControlledChange}
              />
              Interested in buying again
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="message">
              Your Message (Max 25 characters)
              <span className="char-count">
                ({formData.message.length}/25)
              </span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleControlledChange}
              placeholder="Share your thoughts..."
              rows="4"
            />
            {messageError && <span className="error-message">{messageError}</span>}
          </div>

          <button type="submit" className="submit-btn">
            Submit Review
          </button>
        </form>

        {submittedReview && (
          <div className="submitted-review">
            <h4>✓ Review Submitted</h4>
            <p>
              <strong>Name:</strong> {submittedReview.name}
            </p>
            <p>
              <strong>Rating:</strong> {submittedReview.rating} / 5
            </p>
            <p>
              <strong>Buy Again:</strong> {submittedReview.buyAgain ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Message:</strong> "{submittedReview.message}"
            </p>
          </div>
        )}
      </div>

      {/* ===== UNCONTROLLED FORM ===== */}
      <div className="form-container">
        <h3>Uncontrolled Form (Using useRef)</h3>
        <form onSubmit={handleUncontrolledSubmit} className="review-form">
          <div className="form-group">
            <label htmlFor="uname">Name</label>
            <input
              type="text"
              id="uname"
              ref={nameRef}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="division">Division</label>
            <select id="division" ref={divisionRef}>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="umessage">Message</label>
            <textarea
              id="umessage"
              ref={messageRef}
              placeholder="Enter your message"
              rows="4"
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>

        {submittedDivisionData && (
          <div className="submitted-review">
            <h4>✓ Division Data Submitted</h4>
            <p>
              <strong>Name:</strong> {submittedDivisionData.name}
            </p>
            <p>
              <strong>Division:</strong> {submittedDivisionData.division}
            </p>
            <p>
              <strong>Message:</strong> "{submittedDivisionData.message}"
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default CustomerReview;
