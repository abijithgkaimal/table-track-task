import { Button } from '@mui/material'
import React from 'react'

function LandingPage() {
  return (
    <>

      <div class="bg-[url(https://w0.peakpx.com/wallpaper/441/150/HD-wallpaper-gloss-cafe-cool-restaurant-design-luxury.jpg)] md:h-screen h-96 w-full bg-no-repeat bg-cover">
        <div class="text-white flex justify-center flex-col items-center md:pt-60 pt-15">
          <h1 class="md:text-9xl text-5xl">ROYAL FEAST</h1>
          <p class="text-xl mt-15 text-center">Where every meal is a masterpiece and every visit feels like home.
          </p>
          <Button variant="contained" size="medium" sx={{ marginTop: '30px' }}>
            Explore Food
          </Button>
        </div>

      </div>


      <div class="pt-5 bg-gray-900">
        <div class="md:grid grid-cols-2">


          <div class="flex justify-center flex-col items-center md:px-20 px-10">
            <h1 class="text-3xl mt-10 md:mt-0 text-white">OUR STORY</h1>
            <div class="w-40 my-6 h-1 bg-red-750"></div>
            <p class="text-justify text-white">We are inspired by the Japanese concept of ichi-go ichi-e, 一期一会, or “one time, one meeting.” Our goal is not to be a traditional sushiya, but rather to create an experience that represents who and where we are, while respecting and honoring tradition.

              The menu at Mujō is an omakase-only tasting experience. Our menu changes daily and reflects the best seasonal ingredients available, as well as fish flown in directly from Japan. Guests can expect a series of small plates followed by a progression of seasonal nigiri. A supplemental menu of additional specialty items will be available daily.</p>
            <p class="text-justify mt-10 text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque quo, ipsam dolor magnam ipsa odit
              pariatur
              perferendis neque facilis placeat tempora alias hic minus voluptas obcaecati sequi perspiciatis
              reprehenderit expedita? Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim voluptate
              fugiat
              impedit, animi accusamus ad, molestiae ullam asperiores iure obcaecati vero cupiditate inventore
              reiciendis? Ipsa veritatis corporis recusandae doloremque mollitia.

            </p>
          </div>


          <div>
            <img class="" src="https://images.squarespace-cdn.com/content/v1/61d7610c217e3c072ec0c94e/1f11a070-8723-498e-be1e-280e797c97d4/mujo_team_fpo-01.jpg?format=2500w" alt="" />
          </div>
        </div>
      </div >
    </>
  )
}

export default LandingPage
