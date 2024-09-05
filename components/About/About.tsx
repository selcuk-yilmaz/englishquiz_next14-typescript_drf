import Image from "next/image";
import React from "react";
import Category from "../Category/Category";

const About = () => {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-5">
        <div className="lg:col-span-6">
          <div
            className="bg-mycolor-400
            dark:bg-mycolor-100 border-2 dark:border-mycolor-400/20 p-3 rounded-lg"
          >
            <Image
              src="/melo_avatar.jpg"
              alt="about us"
              className="w-full rounded-xl"
              width={500}
              height={500}
            />

            <h2 className="text-center text-3xl mt-4 font-semibold px-4 py-4">
              About
            </h2>
            <div className="space-y-3">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Aspernatur sequi temporibus doloribus iste odit nobis non,
                voluptatum consectetur eum amet eos, corrupti cum rerum labore
                optio tenetur ipsum laboriosam maxime.
              </p>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                quasi obcaecati illum neque alias cumque eligendi in molestiae!
                Molestiae quae inventore fugiat tenetur optio nesciunt
                voluptates nulla. At, fugit! Sunt.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div
            className="bg-mycolor-400
            dark:bg-mycolor-100 border-2 dark:border-mycolor-400/20 p-3 rounded-lg"
          >
            <Image
              src="/images/homeCarousel/carousel-6.jpeg"
              alt="about us"
              className="w-full rounded-xl"
              width={500}
              height={500}
            />
          </div>

          <div
            className="bg-mycolor-400
            dark:bg-mycolor-100 border-2 dark:border-mycolor-400/20 p-3 rounded-lg"
          >
            <Category />
          </div>

          <div
            className="bg-mycolor-400
            dark:bg-mycolor-100 border-2 dark:border-mycolor-400/20 p-3 rounded-lg"
          >
            <Image
              src="/happiness_whiteBG.jpeg"
              alt="about us"
              className="w-full rounded-xl"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
