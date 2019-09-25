// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import page from './information';
import './about.scss';
import content from './about.md';
// import './privacy.scss';
import ViewInformation from '../../components/viewInformation';
import withLoginManager from '../../components/view';

page(content);

const packages = {
  'Front End': {
    React: '',
    'React-dom': '',
    'whatwg-fetch': '',
    FigureOne: '',
  },
  'Back End': {
    'Python': '',
    'Docker': '',
    'Alembic': '',
    'bcrypt': '',
    'Flask': '',
    'Flask-Assets': '',
    'Flask-Login': '',
    'Flask-Mail': '',
    'Flask-Migrate': '',
    'Flask-SQLAlchemy': '',
    'flask-talisman': '',
    'Flask-WTF': '',
    'gunicorn': '',
    'Jinja2': '',
    'psycopg2': '',
    'PyCryptodome': '',
    'Requests': '',
    'SQLAlchemy': '',
    'Werkzeug': '',
    'WTForms': '',
  },
  Tooling: {
    'pip': '',
    'pyenv': '',
    'flake8': '',
    'pyflakes': '',
    'pytest': '',
    'babel/core': '',
    'babel/polyfill': '',
    'babel/preset-env': '',
    'babel/preset-flow': '',
    'babel/preset-react': '',
    'autoprefixer': '',
    'babel-eslint': '',
    'babel-jest': '',
    'babel-loader': '',
    'babel-polyfill': '',
    'clean-webpack-plugin': '',
    'copy-webpack-plugin': '',
    'css-loader': '',
    'eslint': '',
    'eslint-config-airbnb-base': '',
    'eslint-plugin-flowtype': '',
    'eslint-plugin-import': '',
    'eslint-plugin-jest': '',
    'eslint-plugin-react': '',
    'file-loader': '',
    'flow-bin': '',
    'flow-copy-source': '',
    'html-loader': '',
    'jest': '',
    'jest-image-snapshot': '',
    'markdown-loader': '',
    'mathjax-node': '',
    'mini-css-extract-plugin': '',
    'node-fetch': '',
    'node-sass': '',
    'optimize-css-assets-webpack-plugin': '',
    'postcss': '',
    'postcss-loader': '',
    'react-test-renderer': '',
    'regenerator-runtime': '',
    'sass-loader': '',
    'simple-git': '',
    'stylelint': '',
    'stylelint-config-standard': '',
    'stylelint-scss': '',
    'uglifyjs-webpack-plugin': '',
    'webpack': '',
    'webpack-cli': '',
  },
};

function renderCategory(category: string, startIndex: number) {
  const packageList = [];
  let index = startIndex;
  Object.keys(packages[category]).forEach((key) => {
    packageList.push(
      <div className="about__credits_package" key={index}>
        {key}
      </div>,
    );
    index += 1;
  });
  return <div className="about__credits_package_list" key={index}>
    <div className="about__credits_package_list_container">
      <h3 className="about__credits_category_title">
        {category}
      </h3>
      {packageList}
    </div>
  </div>;
}

function renderCredits() {
  const packageLists = [];
  let index = 0;
  packageLists.push(renderCategory('Front End', index));
  index += Object.keys(packages['Front End']).length + 1;
  packageLists.push(renderCategory('Back End', index));
  index += Object.keys(packages['Back End']).length + 1;
  packageLists.push(renderCategory('Tooling', index));
  index += Object.keys(packages.Tooling).length + 1;
  return <div className="about__credits_packages">{packageLists}</div>;
}

const policyPage = () => {
  const id: HTMLElement | null = document.getElementById('information');

  const InformationView = withLoginManager(ViewInformation);
  if (id instanceof HTMLElement) {
    ReactDOM.render(
      <div>
         <InformationView content={content} appendContent={renderCredits()}/>
       </div>,
      id,
    );
  }
};

policyPage();

