import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Router from 'next/router';
import Form from "./styles/Form";
import gql from "graphql-tag";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";

const UPDATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    UpdateItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class UpdateItem extends Component {
  state = {
    title: "Hot Dog",
    description: "Tasty Meat tube",
    image: "dog.jpg",
    largeImage: "HOTDAW#G.jpg",
    price: 1200,
  };

  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({
      [name]: val,
    });
  };

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(UpdateItem, { loading, error }) => {
          return (
            <Form
              onSubmit={ async (e) => {
                // Stop form from submitting
                e.preventDefault();
                // call the mutation
                const res = await UpdateItem();
                // Route them to the item page
                Router.push({
                    pathname: '/item',
                    query: { id: res.data.UpdateItem.id}
                })
              }}
            >
              <Error error={error}/>
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="title">
                  Title
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    required
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="price">
                  Title
                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Price"
                    required
                    value={this.state.price}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="description">
                  Title
                  <textarea
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Enter a description"
                    required
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                </label>
                <button type="submit">Submit</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
