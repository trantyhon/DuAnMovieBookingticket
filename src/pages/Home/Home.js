import React, { useEffect, useState } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";
//Kết nối redux
import { useSelector, useDispatch } from "react-redux";
import Film from "../../components/Film/Film";
import MultipleRowSlick from "../../components/RSlick/MultipleRowSlick";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimActions";
import { layDanhSachHeThongRapAction } from "../../redux/actions/QuanLyRapActions";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";
import PopupTrailer from "../../components/Film/PopupTrailer";

export default function Home(props) {
  const { arrFilm } = useSelector((state) => state.QuanLyPhimReducer);
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);
  const dispatch = useDispatch();
  console.log("propsHome", arrFilm);

  // props.match.params
  // const renderFilms = () => {
  //     return arrFilm.map((phim, index) => {
  //         return <Film key={index} />

  //     })
  // }

  useEffect(() => {
    const action = layDanhSachPhimAction();
    dispatch(action); //dispatch function từ thunk

    dispatch(layDanhSachHeThongRapAction());
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [maPhim, setMaPhim] = useState(1282);

  return (
    <div>
      <HomeCarousel />
      <PopupTrailer
        openModal={openModal}
        setOpenModal={setOpenModal}
        arrFilm={arrFilm}
        maPhim={maPhim}
      />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto ">
          <MultipleRowSlick
            arrFilm={arrFilm}
            setOpenModal={setOpenModal}
            setMaPhim={setMaPhim}
          />
          {/* <div className="flex flex-wrap  " style={{ justifyContent: 'center' }}>
                        {renderFilms()}
                    </div> */}
        </div>
      </section>

      <div className="mx-36">
        <HomeMenu
          heThongRapChieu={heThongRapChieu}
          setOpenModal={setOpenModal}
        />
      </div>
    </div>
  );
}
