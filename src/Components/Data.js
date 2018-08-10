import React, { Component } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Input,
  Card,
  CardTitle,
  ProgressBar,
  Preloader
} from "react-materialize";

import "../App.css";

const headers = {
  Accept: "application/json"
};

class Data extends Component {
  state = {
    modal: false,
    classifier: "",
    loading: false,
    score: 0,
    imgLink:
      "https://nerdymindsmagazine.files.wordpress.com/2017/07/marvel-dc.jpg?w=800"
  };

  submit = e => {
    e.preventDefault();
    const link = e.target[0].value;
    if (link === "") {
      return;
    }
    //https://marveldcserver.herokuapp.com/comic
    this.setState({
      imgLink: link,
      loading: true
    });
    fetch("https://marveldcserver.herokuapp.com/comic", {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        heroURL: link
      })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          data,
          classifier: data.images[0].classifiers[0].classes[0].class,
          score: data.images[0].classifiers[0].classes[0].score,
          loading: false
        });
        console.log(data);
      });
    e.target[0].value = "";
    this.setState({ modal: false });
  };

  render() {
    return (
      <div>
        {this.state.loading === true ? (
          <Row style={{ marginTop: "20vh" }}>
            <Col s={3} />
            <Col s={6}>
              <Preloader size={"big"} flashing />
            </Col>
            <Col s={3} />
          </Row>
        ) : (
          <div>
            <Row>
              <Col m={3} xs={0} />
              <Col m={6} xs={12}>
                <Card
                  className="small"
                  header={<CardTitle image={this.state.imgLink} />}
                  style={{
                    minHeight: "70vh"
                  }}
                >
                  {this.state.data && (
                    <Row>
                      <Row>
                        <Col s={12}>
                          <ProgressBar
                            progress={this.state.score * 100}
                            size="big"
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col s={12}>
                          <h3>
                            {this.state.classifier}&nbsp;Character<br/>
                            Score: {this.state.score}
                          </h3>
                        </Col>
                      </Row>
                    </Row>
                  )}
                </Card>
              </Col>
              <Col m={3} xs={0} />
            </Row>
            <Modal
              bottomSheet
              header="Super Hero Image"
              style={{
                maxHeight: "80%"
              }}
              open={this.state.modal}
              trigger={
                <Button
                  floating
                  large
                  style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    zIndex: "5",
                    background: "#ef4047"
                  }}
                  waves="light"
                  icon="add"
                />
              }
            >
              <form onSubmit={this.submit}>
                <Row>
                  <Input xs={10} m={4} label="Link" />
                  <Button m={3} xs={2} style={{ marginTop: "20px" }}>
                    Check
                  </Button>
                </Row>
              </form>
            </Modal>
          </div>
        )}
      </div>
    );
  }
}

export default Data;
