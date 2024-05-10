import React, { useEffect, useState } from "react";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import addImageIcon from "../assets/addImage.png";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userID = window.localStorage.getItem("userID-dobby");
    if (!userID) {
      navigate("/");
      return;
    }
    const fetchUser = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/details?id=${userID}`
      );
      if (res.data.success) {
        setUser({
          id: res.data._doc._id,
          name: res.data._doc.username,
          images: res.data._doc.images,
        });
      }
    };
    fetchUser();
  }, []);
  const imagebase64 = async (file) => {
    const reader = new FileReader();
    await reader.readAsDataURL(file);
    const data = new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (e) => reject(e);
    });
    return data;
  };
  return (
    <div>
      {user && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            alignItems: "center",
          }}
        >
          <h2 style={{ fontFamily: "cursive", color: "blue" }}>
            Welcome Back "{user.name}" <br /> (Here are Your Images.....)
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              borderWidth: "2px",
              borderColor: "gray",
              borderRadius: "10px",
              borderStyle: "double",
              padding: "30px",
            }}
          >
            {user.images.map((img, i) => (
              <img
                id={i}
                key={i}
                src={img}
                style={{
                  height: "103px",
                  width: "103px",
                  borderRadius: "10px",
                }}
              />
            ))}
            <span
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.click();
                input.addEventListener("change", async () => {
                  const file = input.files[0];
                  try {
                    const image = await imagebase64(file);
                    const res = await axios.post(
                      `${
                        import.meta.env.VITE_BACKEND_URL
                      }/user/image?id=${window.localStorage.getItem(
                        "userID-dobby"
                      )}`,
                      {
                        data: { image: image },
                      }
                    );
                    if (res.data.success) {
                      window.location.reload();
                    } else {
                      alert("Failed to upload.");
                    }
                  } catch (e) {
                    alert("failed to upload");
                  }
                });
              }}
              style={{
                height: "100px",
                width: "100px",
                borderWidth: "3px",
                borderStyle: "dashed",
                borderColor: "black",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <img src={addImageIcon} style={{ height: "50px" }} />
            </span>
          </div>
        </div>
      )}
      <Button
        onClick={() => {
          window.localStorage.removeItem("userID-dobby");
          navigate("/login");
        }}
        style={{
          position: "absolute",
          bottom: "30px",
          right: "30px",
          height: "50px",
          width: "100px",
          fontSize: "18px",
        }}
      >
        Logout
      </Button>
    </div>
  );
}

export default Home;
