import React, { Component } from "react";
import { connect } from "react-redux";
import SearchBar from "../../component/searchbar/searchbar";
import ResultGrid from "../../component/resultgrid/resultgrid";
import * as actionCreators from "../../store/actions/actionCreators";
import { searchColDefinitions } from "../../core/constants";
// import * as actionTypes from '../../store/actions/actionTypes';
import ActionButtons from "../../component/ActionButtons/ActionButtons";
import Placeholder from "../../component/placeholder/placeholder";
import Modal from "../../component/UI/model/model";
import KeyManagement from "../../component/keymanagement/keyManagement";
import Loader from '../../component/UI/loader/loader';
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pattern: "",
      selectedItems: [],
      showModal: false,
      clickedRow: null,
      action: null,
    };
  }
  inputChangeHandler = (event) => {
    const text = event.target.value;
    this.setState((state) => (state.pattern = text));
  };
  clickHandler = (event) => {
    console.log("clicked ", event, this.state.pattern);
    this.props.onPatternSearch(this.state.pattern);
  };
  selectionChanged = (ev) => {
    console.log("****** event : ", ev);
    // this.setState({selectedItems:[...ev]})
  };
  handleEdit = (row) => {
    this.setState({
      showModal: true,
      clickedRow: row,
      action: ACTION_ENUM.EDIT,
    });
  };
  handleDelete = (row) => {
    this.setState({
      showModal: true,
      clickedRow: row,
      action: ACTION_ENUM.DELETE,
    });
  };
  handleCancel = () => {
    console.log("goign to calcel : ");
    this.setState({ showModal: false });
  };
  handleSubmit = () => {
    // this.setState({showModal:false})
    if (this.state.action === ACTION_ENUM.EDIT) {
      const { key, value } = this.state.clickedRow.row.values;
      console.log("goignto edit", this.state.clickedRow.row.values);
      this.props.onRowEdit(key, value);
    } else if (this.state.action === ACTION_ENUM.DELETE) {
      this.setState({ showModal: false });
      console.log("goignto delete", this.state.clickedRow);
      const { key } = this.state.clickedRow.row.values;
      this.props.onRowDelete(key);
    }
  };
  render() {
    const content =
      this.props.searchResult.length > 0 ? (
        <ResultGrid
          colDefinitions={searchColDefinitions}
          rows={this.props.searchResult}
          pattern={this.props.pattern}
          selectionChanged={this.selectionChanged}
          onRowEdit={(row) => this.handleEdit(row)}
          onRowDelete={(row) => this.handleDelete(row)}
        />
      ) : (
        <Placeholder />
      );
    return (
      <>
        <SearchBar
          value={this.state.pattern}
          onChange={this.inputChangeHandler}
          clicked={this.clickHandler}
        />
        {content}
        <Modal
          show={this.state.showModal}
          cancelClicked={this.handleCancel}
          submitClicked={this.handleSubmit}
          title="Confirmation"
        >
          <KeyManagement row={this.state.clickedRow?.row}/>
        </Modal>
        {this.props.loading && <Loader />}
      </>
    );
  }
}
const ACTION_ENUM = Object.freeze({ EDIT: 0, DELETE: 1 });
const mapStateToProps = (state) => {
  return {
    pattern: state.pattern,
    searchResult: state.searchResult,
    loading: state.loading,
    hasError: state.hasError,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onPatternSearch: (searchTerm) =>
      dispatch(actionCreators.searchKeys(searchTerm)),
    onRowEdit: (key, value) => dispatch(actionCreators.editKey(key, value)),
    onRowDelete: (key) => dispatch(actionCreators.deleteKey(key)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
