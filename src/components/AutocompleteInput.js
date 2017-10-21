import React, { Component } from 'react';
import axios from 'axios';

const KeyDownHandlers = {
  ArrowUp(ev) {
    ev.preventDefault();
    const {
      selectedIndex,
      results
    } = this.state;

    const index = selectedIndex === undefined || selectedIndex === 0 ?
      results.length - 1 : 
      selectedIndex - 1
    this.setState({
      selectedIndex: index
    });

  },
  ArrowDown(ev) {
    ev.preventDefault();
    const {
      selectedIndex,
      results
    } = this.state;

    const index = selectedIndex === undefined || selectedIndex === results.length - 1 ?
      0 :
      selectedIndex + 1;

    this.setState({
      selectedIndex: index
    });
  },
  Tab(ev) {
    const {
      selectedIndex,
      results
    } = this.state;

    if (selectedIndex !== undefined) {
      ev.preventDefault();
    }

    const index = selectedIndex === undefined || selectedIndex === results.length - 1 ?
      0 :
      selectedIndex + 1;

    this.setState({
      selectedIndex: index
    });
  },
  Enter(ev) {
    if (this.state.selectedIndex !== undefined) {
      ev.preventDefault();
      this.selectEmail(this.state.selectedIndex, ev);
    }
  }
}

class AutocompleteInput extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleResultHover = this.handleResultHover.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.selectEmail = this.selectEmail.bind(this);

    this.state = {
      results: [],
      showResults: false,
      selectedIndex: undefined
    };
  }

  selectEmail(index, ev) {
    const { maxValues } = this.props;
    const { results } = this.state;
    const { name, value } = this.refs.input;
    const emails = value.split(', ');
    let newVal = '';

    emails.pop();

    this.setState({
      results: [],
      showResults: false,
      selectedIndex: undefined
    });

    if (emails.length < maxValues) {
      emails.push(results[index].email);
      newVal = emails.join(', ');
      newVal += maxValues > 1 ? ',' : '';
      this.props.onChange(ev, newVal, name);
    }
  }

  handleChange(ev) {
    this.props.onChange(ev, ev.target.value);
  }

  handleKeyDown(ev) {
    if(KeyDownHandlers[ev.key]) {
      KeyDownHandlers[ev.key].call(this, ev);
    }
  }

  handleFocus(ev) {
    if(ev.target.value === '') {
      this.search('');
    }
  }

  handleBlur(ev) {
    if (!this.ignoreBlur) {
      this.setState({
        results: [],
        showResults: false,
        selectedIndex: undefined
      });
    }
  }

  handleInput(ev) {
    const { maxValues } = this.props;
    const values = ev.target.value.split(', ');

    if(values.length - 1 < maxValues) {
      const searchParam = values.pop();
      this.search(searchParam);  
    }
  }

  handleResultHover(index, ev) {
    ev.preventDefault();
    this.setState({
      selectedIndex: index
    });
  }

  search(value) {
    axios.get(`http://localhost:8081/email/contacts?search=${encodeURI(value)}`)
      .then((response) => {
        const { results } = response.data;

        this.setState({
          results,
          showResults: !!results.length,
          selectedIndex: 0
        });
      });
  }

  render() {
    const {
      results,
      showResults,
      selectedIndex
    } = this.state;

    const {
      onChange,
      value,
      maxValues,
      ...props
    } = this.props

    return (
      <div className="AutoCompleteInput">
        <input
          className="form-control"
          ref="input"
          autoComplete="off"
          value={value}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onInput={this.handleInput}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          {...props} />
        {showResults && 
          <ul
            className="results"
            onMouseEnter={() => { this.ignoreBlur = true; }}
            onMouseLeave={() => { this.ignoreBlur = false; }}>
            {results.map((result, index) => {
              return (
                <li
                  key={result.email}
                  className={index === selectedIndex ? 'selected': ''}
                  onMouseEnter={this.handleResultHover.bind(this, index)}
                  onClick={this.selectEmail.bind(this, index)}>
                    {result.name.first} {result.name.last} &lt;{result.email}&gt;
                </li>
              );
            })}
          </ul>
        }
      </div>
    );
  }
}

AutocompleteInput.defaultProps = {
  maxValues: Infinity,
  onChange() {},
  value: '',
};

export default AutocompleteInput;