import {
  faArrowLeft,
  faBuilding,
  faEnvelope,
  faFaceSmile,
  faMapMarkerAlt,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SlideUp from "../Components/Animations/SlideUp";
import "../StyleSheets/About.css";
import "../StyleSheets/Contact.css";
import "../StyleSheets/Home.css";
import ContactCoverImg from "../Utils/Images/Contact Images/Contact Us Cover Background.jpg";
import ECGLine from "../Utils/Images/Home Images/ECG Line Image.png";
import ECGTransparentLine from "../Utils/Images/Home Images/ECG Transparent Line.png";
import Credentials from "../Static/Credential.json";

const Cover = () => {
  const [displayedText, setDisplayedText] = useState("");
  const navigate = useNavigate();
  const text =
    "Locate us easily! Find AliveAI HQ. Seamless integration, precise directions, and real-time updates. Explore now!";

  useEffect(() => {
    let index = -1;
    setDisplayedText("");
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="contact-cover-image-with-overlay">
      <img src={ContactCoverImg} alt="Cover" />
      <div className="contact-cover-overlay-layer" />
      <div className="contact-cover-overlay-text">
        <SlideUp>
          <h1>{"Home -> Contact Us"}</h1>
        </SlideUp>
        <SlideUp>
          <h3>{displayedText}</h3>
        </SlideUp>
        <SlideUp>
          <div className="back-to-home" onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faArrowLeft} className="left-icon" />
            <span className="back-to-home-text underline-expand">
              Back to Home
            </span>
          </div>
        </SlideUp>
      </div>
    </div>
  );
};

const ContactCards = () => {
  const data = [
    {
      icon: <FontAwesomeIcon icon={faMapMarkerAlt} />,
      title: "OUR LOCATION",
      text: ["1511 Bridges Court Fremont, CA-94536 USA"],
    },
    {
      icon: <FontAwesomeIcon icon={faEnvelope} />,
      title: "EMAIL ADDRESS",
      text: ["enquiry@alive.ai", "enquiry@alive.ai"],
    },
    {
      icon: <FontAwesomeIcon icon={faPhone} />,
      title: "PHONE NUMBER",
      text: ["+1 987 654 321", "+1 987 654 321"],
    },
  ];

  return (
    <div className="contact-container-main">
      <SlideUp>
        <h1 className="contact-container-main-h1">Our Office</h1>
      </SlideUp>
      <Row className="justify-content-center py-2">
        <SlideUp>
          <img src={ECGLine} alt="ECG Line" />
        </SlideUp>
      </Row>
      <Row className="text-center py-2">
        <SlideUp>
          <h6>
            Get in touch with us easily through our office locations, direct
            emails, and quick phone support for assistance.
          </h6>
        </SlideUp>
      </Row>
      <div className="contact-cards">
        {data.map((item, index) => (
          <SlideUp key={index}>
            <div className="card">
              <div className="contact-cards-icon">{item.icon}</div>
              <div>
                <h3>{item.title}</h3>
                {item.text.map((val, i) => (
                  <p key={i}>{val}</p>
                ))}
              </div>
            </div>
          </SlideUp>
        ))}
      </div>
    </div>
  );
};

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.575452,
  lng: -122.000254,
};

const Feedback = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: Credentials["Google Map Secret Key"],
  });

  const mapRef = useRef(null);
  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, email, description } = formData;

    if (!fullName || !email || !description) {
      Swal.fire({
        icon: "error",
        title: "Empty Fields",
        text: "Please fill in all form fields before submitting.",
        customClass: {
          confirmButton: "btn-blue",
        },
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Message Sent",
        text: "Thank you for your feedback!",
        customClass: {
          confirmButton: "btn-blue",
        },
      });
      setFormData({ fullName: "", email: "", description: "" });
    }
  };

  return (
    <div className="feedback-container-main">
      <SlideUp>
        <h1 className="feedback-container-main-h1">Feedback</h1>
      </SlideUp>
      <Row className="justify-content-center py-2">
        <SlideUp>
          <img src={ECGLine} alt="ECG Line" />
        </SlideUp>
      </Row>
      <Row className="text-center py-2">
        <SlideUp>
          <h6>
            Share your experience and suggestions with us through our feedback
            form to help improve our services and care.
          </h6>
        </SlideUp>
      </Row>
      <SlideUp>
        <div className="feedback-form-container">
          <h1>GET IN TOUCH</h1>
          <div className="underlineBox-1">
            <div className="underline"></div>
          </div>
          <div className="form-and-map">
            <div className="feedback-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    id="full-name"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button className="form-button" type="submit">
                  Send Message
                </button>
              </form>
            </div>
            <div className="feedback-map">
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={12}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                >
                  <MarkerF position={center} />
                </GoogleMap>
              ) : (
                <div>Loading Location...</div>
              )}
            </div>
          </div>
        </div>
      </SlideUp>
    </div>
  );
};

// Counter Component
const Counter = () => {
  const [countPatients, setCountPatients] = useState(0);
  const [countSpecialists, setCountSpecialists] = useState(0);
  const [countLocations, setCountLocations] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const counterRef = useRef(null);

  const targetPatients = 4352;
  const targetSpecialists = 120;
  const targetLocations = 25;
  const duration = 2000;

  useEffect(() => {
    const handleScroll = (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !hasStarted) {
        setHasStarted(true);

        const animateCount = (start, end, setCount) => {
          const increment = end / (duration / 10);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 20);
        };

        animateCount(0, targetPatients, setCountPatients);
        animateCount(0, targetSpecialists, setCountSpecialists);
        animateCount(0, targetLocations, setCountLocations);
      }
    };

    const observer = new IntersectionObserver(handleScroll, {
      threshold: 0.5,
    });

    const currentRef = counterRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [
    hasStarted,
    targetPatients,
    targetSpecialists,
    targetLocations,
    duration,
  ]);

  return (
    <div ref={counterRef} className="Counter-container-main">
      <div className="container">
        <SlideUp>
          <h1 className="counter-container-h1">Our Team</h1>
        </SlideUp>
        <Row className="justify-content-center py-2">
          <SlideUp>
            <img src={ECGTransparentLine} alt="ECG Line" />
          </SlideUp>
        </Row>
        <Row className="text-center py-2">
          <SlideUp>
            <h6>
              Meet the passionate innovators behind AliveAI, dedicated to
              transforming the future of intelligent solutions.
            </h6>
          </SlideUp>
        </Row>
        <SlideUp>
          <Container className="Counter-container">
            <div className="Box">
              <FontAwesomeIcon icon={faFaceSmile} className="icon" />
              <h2>{countPatients}</h2>
              <h3>PATIENTS</h3>
            </div>
            <div className="Box">
              <FontAwesomeIcon icon={faUser} className="icon" />
              <h2>{countSpecialists}</h2>
              <h3>SPECIALISTS</h3>
            </div>
            <div className="Box">
              <FontAwesomeIcon icon={faBuilding} className="icon" />
              <h2>{countLocations}</h2>
              <h3>LOCATIONS</h3>
            </div>
          </Container>
        </SlideUp>
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="main">
      <Cover />
      <ContactCards />
      <Feedback />
      <Counter />
    </div>
  );
};

export default Contact;
