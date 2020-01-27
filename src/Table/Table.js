import React from "react";


class Table extends React.Component {
  render() {
    return (
      <div>
        <table className="table" style={{ cursor: "pointer" }}>
          <thead>
            <tr>
              <th onClick={this.props.onSort.bind(null, "id")}>
                ID{" "}
                {this.props.sortField === "id" ? <small>{this.props.sort}</small> : null}
              </th>
              <th onClick={this.props.onSort.bind(null, "firstName")}>
                First Name{" "}
                {this.props.sortField === "firstName" ? (
                  <small>{this.props.sort}</small>
                ) : null}
              </th>
              <th onClick={this.props.onSort.bind(null, "lastName")}>
                Last Name{" "}
                {this.props.sortField === "lastName" ? (
                  <small>{this.props.sort}</small>
                ) : null}
              </th>
              <th onClick={this.props.onSort.bind(null, "email")}>
                E-mail{" "}
                {this.props.sortField === "email" ? (
                  <small>{this.props.sort}</small>
                ) : null}
              </th>
              <th onClick={this.props.onSort.bind(null, "phone")}>
                Phone{" "}
                {this.props.sortField === "phone" ? (
                  <small>{this.props.sort}</small>
                ) : null}
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map(item => (
              <tr
                key={item.id + item.phone}
                onClick={this.props.onRowSelect.bind(null, item)}
              >
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
