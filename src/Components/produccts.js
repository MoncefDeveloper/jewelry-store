import React, { useEffect, useRef, useCallback } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../contexts/adminContext";

gsap.registerPlugin(ScrollTrigger);

const Products = ({
  id,
  name,
  category_id,
  image_name,
  image_name2,
  index,
  isChanging,
}) => {
  const { categoryItems } = useGlobalContext();
  const category_name = categoryItems.filter((item) => item.id === category_id);
  let product = useRef(null);

  const imgAnimation = useCallback(() => {
    gsap.from(product, 1, {
      y: 200,
      opacity: 0,
      scrollTrigger: {
        trigger: product,
        scrub: true,
        start: "top bottom",
        end: "-200px center ",
      },
    });
  }, []);
  useEffect(() => {
    imgAnimation();
  }, [imgAnimation]);

  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);
  }, []);

  // let picture = useRef(null)

  // const imgAnimation = useCallback(() => {
  //     if (picture) {
  //         const pic=picture.getBoundingClientRect();
  //         if (window.pageYOffset==pic.top) {
  //         }
  //         console.log(pic.top,',',window.pageYOffset);
  //     }
  // },[])

  // useEffect(() => {
  //     onscroll=()=>{
  //         imgAnimation();
  //     }
  // }, [imgAnimation,onscroll])

  let rightOrLeft = "left-right-side";
  let nameAndCategory = "name-category-right";

  return (
    <Link
      to={`/detail/${id}`}
      key={index}
      className={`product-box ${isChanging && "product-box-change"}`}
      ref={(e) => (product = e)}
    >
      <div className={`right-side ${isChanging && "right-side-change"}`}>
        <img
          src={
            process.env.REACT_APP_IMAGE_FILE_PATH +
            "bijoux-image/" +
            image_name2
          }
          onError={(e) =>
            (e.target.src =
              process.env.REACT_APP_IMAGE_FILE_PATH + "008_-_404_error_4x.webp")
          }
          alt="img"
        />
      </div>
      <div
        className={`left-side ${index % 2 >= 1 && !isChanging && rightOrLeft}`}
      >
        <div
          className={`name-category ${
            index % 2 >= 1 && !isChanging && nameAndCategory
          } ${isChanging && "name-category-change"} `}
        >
          <h2 className="name">{name}</h2>
          <h2 className="category">
            {category_name[0] && category_name[0].name}
          </h2>
        </div>
        <button style={isChanging ? { display: "none" } : null}>
          Buy Online
        </button>
      </div>
      <div className={`in-center ${isChanging && "in-center-change"}`}>
        <img
          src={
            process.env.REACT_APP_IMAGE_FILE_PATH + "bijoux-image/" + image_name
          }
          onError={(e) =>
            (e.target.src =
              process.env.REACT_APP_IMAGE_FILE_PATH + "008_-_404_error_4x.webp")
          }
          alt="img"
        />
      </div>
    </Link>
  );
};

export default React.memo(Products);
