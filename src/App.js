import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Loader from './Loader/Loader';
import Table from './Table/Table';
import AdditionalRowView from './AdditionalRowView/AdditionalRowView';
import ChangeMode from './ChangeMode/ChangeMode';
import TableSearch from './TableSearch/TableSearch';
import _ from 'lodash';
import AddUser from './AddUser/AddUser';

class App extends Component {
  state ={
    isChangeMode: false,
    isLoading: false,
    data: [],
    search: '',
    sort: 'asc',  // 'desc'
    sortField: 'id',
    row: null,
    currentPage: 0,
    isOpenNewRow: false
  }
  async fetchData(url) {
    const response = await fetch(url)
    const data = await response.json()
   
    this.setState({
      isLoading: false,
      data: _.orderBy(data, this.state.sortField, this.state.sort)
    })

  }
  onSort = sortField => {
    const cloneData = this.state.data.concat();
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc';
    const data = _.orderBy(cloneData, sortField, sort);
    this.setState({ data, sort, sortField })
  }
 
  changeModeHandler = url => {  
    // console.log(url)
    this.setState({
      isChangeMode: true,
      isLoading: true,
    })
    this.fetchData(url)
  }

  
  onRowSelect = row => (
    this.setState({row})
  )

  pageChangeHandler = ({selected}) => (
    this.setState({currentPage: selected})
  )

  searchHandler = search => {
    this.setState({search, currentPage: 0})
  }

  addField = userNew => {
    const cloneData = this.state.data.concat();
    cloneData.unshift({id: userNew.id, 
                       firstName: userNew.firstName, 
                       lastName: userNew.lastName,
                       phone: userNew.phone,
                       email: userNew.email,
                       description: "",
                       address: {city: "",
                                 state: "",
                                 streetAddress: "",
                                 zip: "",
                                }
                      })
    this.setState({data:cloneData, isOpenNewRow: false})
  }
  
  getFilteredData(){
    const {data, search} = this.state

    if (!search) {
      return data
    }
   var result = data.filter(item => {
     return (
       item["firstName"].toLowerCase().includes(search.toLowerCase()) ||
       item["lastName"].toLowerCase().includes(search.toLowerCase()) ||
       item["email"].toLowerCase().includes(search.toLowerCase())
     );
   });
   if(!result.length){
     result = this.state.data
   }
    return result
  }

  render() {
    const this_ = this
    function openAddRow(){
    if(this_.state.isOpenNewRow === true){
      this_.setState({isOpenNewRow: false})
    } else{
      this_.setState({isOpenNewRow: true})
    }
  }
    
    const pageSize = 50;
    if(!this.state.isChangeMode){
      return (
        <div className="container">
          <ChangeMode onSelect={this.changeModeHandler}/>
        </div>
      )
    }
   
    const filteredData = this.getFilteredData();
    // debugger
    const pageCount = Math.ceil(filteredData.length / pageSize)
    const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage]
    return (
      <div className="container">
      {
        this.state.isLoading 
        ? <Loader />
        : <React.Fragment>
            <TableSearch onSearch={this.searchHandler}/>
            {(this.state.isOpenNewRow === false) ? <button onClick={openAddRow}>Добавить </button> : <AddUser addField = {this.addField} />}
            <Table 
              data={displayData}
              onSort={this.onSort}
              sort={this.state.sort}
              sortField={this.state.sortField}
              onRowSelect={this.onRowSelect}
            />
          </React.Fragment>
      }

      {
        this.state.data.length > pageSize
        ? <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={this.pageChangeHandler}
        containerClassName={'pagination'}
        activeClassName={'active'}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        forcePage={this.state.currentPage}
      /> : null
      }

      {
        this.state.row ? <AdditionalRowView person={this.state.row} /> : null
      }
      </div>
    );
  }
}

export default App;
