import React from "react"
import { EmailShareButton, FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon, EmailIcon } from "react-share"

import { MdShare } from "react-icons/md"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const FavShareButton = (props) => {
    const [show, setShow] = React.useState(false);

    const handleClose = (event) => {
      setShow(false);
    }

    const handleCloseNext = (event) => {
      event.preventDefault();
    }

    const handleShow = (event) => {
      event.preventDefault();
      setShow(true);
    }

    let source = ""
    if (props.source === "guardian") {
      source = "GUARDIAN"
    }
    else {
      source = "NYTIMES"
    }
    return (
      <>
        <span ><MdShare className="main-share" onClick={handleShow}/></span>


        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton onClick={handleCloseNext}>
            <Modal.Title>
              <h2>{source}</h2>

              {props.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

              <p>Share via</p>
              <FacebookShareButton
                className="shareBtn ml-3 mr-3"
                url={props.url}
                hashtag="#CSCI_571_NewsApp">
                <FacebookIcon size={60} round={true} />
              </FacebookShareButton>

              <TwitterShareButton
                className="shareBtn ml-3 mr-3"
                url={props.url}
                hashtags={["CSCI_571_NewsApp"]}>
                <TwitterIcon size={60} round={true} />
              </TwitterShareButton>

              <EmailShareButton
                className="shareBtn ml-3 mr-3"
                subject={"#CSCI_571_NewsApp"}
                url={props.url}>
                <EmailIcon size={60} round={true} />
              </EmailShareButton>

          </Modal.Body>
        </Modal>
      </>
    );
  }



export default FavShareButton
