import React, { Component } from 'react';
import './App.css';

import MenuAppBar from './Bar';
import ClippedDrawer from './Drawer';
import Sheet from './Sheet';
import CharInfoSheet from './CharInfoSheet';
import Portrait from './Portrait';
import StatsSheet from './StatsSheet';
import { loadCharacter, saveCharacter, rollDie } from './Utilities';

class App extends Component {
  state = {
    isEditing: false,
    charName: "Character Name",
    activeScreen: <CharInfoSheet/>,
    portrait: undefined,
    sheets: {
      portrait: {
        title: "Portrait",
        screen: <Portrait/>,
        path: undefined
      },
      charInfo: {
        title: "Character Info",
        screen: <CharInfoSheet/>
      },
      stats: {
        title: "Stats",
        screen: <StatsSheet/>
      }
    },
  }

  constructor(props) {
    super(props);
    this.updateSheet = this.updateSheet.bind(this);
  }

  handleEdit = () => {
    this.state.isEditing ? (
      this.setState({ isEditing: false })
    ) : (
      this.setState({ isEditing: true })
    )
    // use these elsewhere, here for testing purposes
    this.handleSave();
    this.handleLoad();
    console.log(rollDie(6,3));
  }

  handleSave = () => {
    saveCharacter(this.state.charName, this.state);
  }

  handleLoad = () => {
    let savedCharacter = loadCharacter(this.state.charName);
    console.log(savedCharacter);
  }

  handleNameChange = (name) => {
    this.setState({ charName: name });
  };

  updateSheet = (arg) => {
    this.setState({activeScreen: arg});
  };

  render() {
      const { isEditing, charName } = this.state;

    return (
      <div className="App">
        <MenuAppBar
          isEditing={isEditing}
          charName={charName}
          onEditToggle={this.handleEdit}
        />
        <Sheet
          isEditing={isEditing}
          onNameChange={this.handleNameChange}
        />
        <ClippedDrawer
          sheets={this.state.sheets}
          activeScreen={this.state.activeScreen}
          updateSheet={this.updateSheet}
        />
      </div>
    );
  }
}

export default App;
