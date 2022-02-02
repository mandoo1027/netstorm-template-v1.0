import React, { Component } from "react";

import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Auctions from "../components/Auctions/AuctionsOne";
import TopSeller from "../components/TopSeller/TopSellerOne";
import Collections from "../components/Collections/Collections";
import Explore from "../components/Explore/ExploreOne";
import LifeCycleSample from "../components/Sample/LifeCycleSample";

function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

class ThemeOne extends Component {
  state = {
    color: "#00000",
  };

  handleClick = () => {
    this.setState({
      color: getRandomColor(),
    });
  };

  render() {
    return (
      <div className="main">
        <button onClick={this.handleClick}>랜덤 색상</button>
        <LifeCycleSample color={this.state.color} />
      </div>
    );
  }
}

export default ThemeOne;
