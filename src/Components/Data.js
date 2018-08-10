import React, { Component } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Input,
  Card,
  CardTitle,
  ProgressBar
} from "react-materialize";

const headers = {
  Accept: "application/json"
};

class Data extends Component {
  state = {
    modal: false,
    classifier: "",
    score: 0,
    // data: {},
    imgLink:
      "https://nerdymindsmagazine.files.wordpress.com/2017/07/marvel-dc.jpg?w=800"
  };

  submit = e => {
    e.preventDefault();
    const link = e.target[0].value;
    if (link === "") {
      // console.log(`title:${title}\nname:${name}\ncategory:${category}\nbody:${body}`)
      return;
    }
    //https://marveldcserver.herokuapp.com/comic
    this.setState({
      imgLink: link
    });
    fetch("http://localhost:4000/comic", {
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
          data
        });
        this.setState({
          classifier: data.images[0].classifiers[0].classes[0].class,
          score: data.images[0].classifiers[0].classes[0].score
        });
        console.log(data);
      });
    e.target[0].value = "";
    this.setState({ modal: false });
  };

  render() {
    return (
      <div>
        <Row>
          <Col m={2} s={0} />
          <Col m={8} s={12}>
            <Card
              className="small"
              header={
                <CardTitle image={this.state.imgLink}>
                  <h1 style={{background:"#fff",color:"#000"}}>{this.state.classifier}</h1>
                </CardTitle>
              }
              style={{
                height: "100%"
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
                      <h2>{this.state.score}</h2>
                    </Col>
                  </Row>
                </Row>
              )}
            </Card>
          </Col>
          <Col m={2} s={0} />
        </Row>
        <Modal
          bottomSheet
          header="New Post"
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
                zIndex: "5"
              }}
              waves="light"
              icon="add"
            />
          }
        >
          <form onSubmit={this.submit}>
            <Row>
              <Input s={12} m={4} label="Link" />
            </Row>
            <Row>
              <Col m={9} s={6} />
              <Button m={3} s={6}>
                Post
              </Button>
            </Row>
          </form>
        </Modal>
      </div>
    );
  }
}

export default Data;
