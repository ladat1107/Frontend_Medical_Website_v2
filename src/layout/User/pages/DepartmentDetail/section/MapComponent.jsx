import React from "react";
import { Card } from "antd";

const GoogleMap = () => {
    return (
        <>
            <iframe
                title="hospital-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.72971988862!2d106.66183357451692!3d10.755301459584132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ef083aed259%3A0xdc35aee68bbb8dc9!2zMjE1IMSQLiBI4buTbmcgQsOgbmcsIFBoxrDhu51uZyAxMSwgUXXhuq1uIDUsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1734425776391!5m2!1svi!2s"
                width="100%"
                height="450"
                style={{ border: "0", borderRadius: "8px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </>
    );
};

export default GoogleMap;
