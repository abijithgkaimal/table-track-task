import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate(); 

  return (
    <>
      <div className="bg-[url('https://w0.peakpx.com/wallpaper/441/150/HD-wallpaper-gloss-cafe-cool-restaurant-design-luxury.jpg')] md:h-screen h-96 w-full bg-no-repeat bg-cover">
        <div className="text-white flex justify-center flex-col items-center md:pt-60 pt-15">
          <h1 className="md:text-9xl text-5xl font-bold">ROYAL FEAST</h1>
          <p className="text-xl mt-5 text-center max-w-2xl">
            Where every meal is a masterpiece and every visit feels like home.
          </p>

          <div className="flex gap-4 mt-8">
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={() => navigate("/customer/foodmenu")} 
            >
              Explore Food
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-10 bg-gray-900">
        <div className="md:grid grid-cols-2">
          <div className="flex justify-center flex-col items-center md:px-20 px-10">
            <h1 className="text-3xl mt-10 md:mt-0 text-white">OUR STORY</h1>
            <div className="w-40 my-6 h-1 bg-red-700"></div>
            <p className="text-justify text-white">
              We are inspired by the Japanese concept of ichi-go ichi-e, 一期一会,
              or “one time, one meeting.” Our goal is not to be a traditional
              sushiya, but rather to create an experience that represents who and
              where we are, while respecting and honoring tradition.
            </p>
            <p className="text-justify mt-10 text-white">
              The menu at Mujō is an omakase-only tasting experience. Our menu
              changes daily and reflects the best seasonal ingredients available,
              as well as fish flown in directly from Japan. Guests can expect a
              series of small plates followed by a progression of seasonal nigiri.
            </p>
          </div>

          <div>
            <img
              className="w-full h-full object-cover"
              src="https://images.squarespace-cdn.com/content/v1/61d7610c217e3c072ec0c94e/1f11a070-8723-498e-be1e-280e797c97d4/mujo_team_fpo-01.jpg?format=2500w"
              alt="Restaurant team"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
