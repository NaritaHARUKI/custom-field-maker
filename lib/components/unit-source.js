'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UnitSource = function (_Component) {
  (0, _inherits3.default)(UnitSource, _Component);

  function UnitSource(props) {
    (0, _classCallCheck3.default)(this, UnitSource);
    return (0, _possibleConstructorReturn3.default)(this, (UnitSource.__proto__ || (0, _getPrototypeOf2.default)(UnitSource)).call(this, props));
  }

  (0, _createClass3.default)(UnitSource, [{
    key: 'renderValidator',
    value: function renderValidator(item, acmscss) {
      if (!item.openValidator) {
        return null;
      }
      return _react2.default.createElement(
        _react.Fragment,
        null,
        item.validator.map(function (validator) {
          if (!validator.option) {
            return null;
          }
          var name = item.type === 'file' || item.type === 'image' ? item.name + '@path' : item.name;
          return _react2.default.createElement(
            _react.Fragment,
            null,
            _react2.default.createElement('input', { type: 'hidden', name: name + ':v#' + validator.option, value: validator.value }),
            validator.message && _react2.default.createElement(
              _react.Fragment,
              null,
              '<!-- BEGIN ' + name + ':validator#' + validator.option + ' -->',
              _react2.default.createElement(
                'p',
                { className: (0, _classnames2.default)({ "acms-admin-text-error": acmscss }) },
                validator.message
              ),
              '<!-- END ' + name + ':validator#' + validator.option + ' -->'
            ),
            item.converter && _react2.default.createElement('input', { type: 'hidden', name: '{name}:c', value: '{converter}' })
          );
        })
      );
    }
  }, {
    key: 'renderNoSearch',
    value: function renderNoSearch(item) {
      if (!item.noSearch) {
        return null;
      }
      return _react2.default.createElement('input', { type: 'hidden', name: item.name + ':search', value: '0' });
    }
  }, {
    key: 'renderTh',
    value: function renderTh(item) {
      return _react2.default.createElement(
        'th',
        null,
        item.title,
        item.tooltip && _react2.default.createElement('i', { className: 'acms-admin-icon-tooltip js-acms-tooltip', 'data-acms-tooltip': item.tooltip })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          acmscss = _props.acmscss,
          customunit = _props.customunit,
          preview = _props.preview;

      return _react2.default.createElement(
        'table',
        { className: (0, _classnames2.default)({ 'acms-admin-table-admin-edit': acmscss }) },
        customunit.map(function (item) {
          if (item.type === 'text') {
            return _react2.default.createElement(
              'tr',
              null,
              _this2.renderTh(item, acmscss),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement('input', { type: 'text', name: item.name + '{id}', value: '{' + item.name + '}', className: (0, _classnames2.default)({ 'acms-admin-form-width-full': acmscss }) }),
                _react2.default.createElement('input', { type: 'hidden', name: 'unit{id}[]', value: item.name + '{id}' }),
                _this2.renderValidator(item, acmscss),
                _this2.renderNoSearch(item)
              )
            );
          } else if (item.type === 'textarea') {
            return _react2.default.createElement(
              'tr',
              null,
              _this2.renderTh(item, acmscss),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement(
                  'textarea',
                  { name: item.name + '{id}', className: (0, _classnames2.default)({ "acms-admin-form-width-full": acmscss }) },
                  '{' + item.name + '}'
                ),
                _react2.default.createElement('input', { type: 'hidden', name: 'unit{id}[]', value: item.name + '{id}' }),
                _this2.renderValidator(item, acmscss)
              )
            );
          } else if (item.type === 'select') {
            return _react2.default.createElement(
              'tr',
              null,
              _this2.renderTh(item, acmscss),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement(
                  'select',
                  { name: item.name + '{id}', className: (0, _classnames2.default)({ "acms-admin-form-width-full": acmscss }) },
                  _react2.default.createElement('option', { value: '' }),
                  item.option.map(function (option) {
                    if (!option.label) {
                      return null;
                    } else {
                      return _react2.default.createElement(
                        'option',
                        { value: option.value, 'data-tmp': '{' + item.name + ':selected#' + option.value + '}' },
                        option.label
                      );
                    }
                  })
                ),
                _react2.default.createElement('input', { type: 'hidden', name: 'unit{id}[]', value: item.name + '{id}' }),
                _this2.renderValidator(item, acmscss)
              )
            );
          } else if (item.type === 'radio') {
            return _react2.default.createElement(
              'tr',
              null,
              _this2.renderTh(item),
              _react2.default.createElement(
                'td',
                null,
                item.option.map(function (option) {
                  if (!option.label) {
                    return null;
                  } else {
                    return _react2.default.createElement(
                      'div',
                      { className: (0, _classnames2.default)({ "acms-admin-form-radio": acmscss }) },
                      _react2.default.createElement('input', { type: 'radio', name: item.name + '{id}', value: option.value, 'data-tmp': '{' + item.name + ':checked#' + option.value + '}', id: 'input-radio-' + item.name + '-' + option.value + '-{id}' }),
                      _react2.default.createElement(
                        'label',
                        { htmlFor: 'input-radio-' + item.name + '-' + option.value + '-{id}' },
                        _react2.default.createElement('i', { className: 'acms-admin-ico-radio' }),
                        option.label
                      )
                    );
                  }
                }),
                _react2.default.createElement('input', { type: 'hidden', name: 'unit{id}[]', value: item.name + '{id}' }),
                _this2.renderValidator(item, acmscss)
              )
            );
          } else if (item.type === 'checkbox') {
            return _react2.default.createElement(
              'tr',
              null,
              _this2.renderTh(item),
              _react2.default.createElement(
                'td',
                null,
                item.option.map(function (option) {
                  if (!option.label) {
                    return null;
                  } else {
                    return _react2.default.createElement(
                      'div',
                      { className: (0, _classnames2.default)({ "acms-admin-form-checkbox": acmscss }) },
                      _react2.default.createElement('input', { type: 'checkbox', name: item.name + '{id}[]', value: option.value, 'data-tmp': '{' + item.name + ':checked#' + option.value + '}', id: 'input-checkbox-' + item.name + '-' + option.value + '-{id}' }),
                      _react2.default.createElement(
                        'label',
                        { htmlFor: 'input-checkbox-' + item.name + '-' + option.value + '-{id}' },
                        _react2.default.createElement('i', { className: 'acms-admin-ico-checkbox' }),
                        option.label
                      )
                    );
                  }
                }),
                _react2.default.createElement('input', { type: 'hidden', name: 'unit{id}[]', value: item.name + '{id}' }),
                _this2.renderValidator(item, acmscss)
              )
            );
          } else if (item.type === 'image') {
            return _react2.default.createElement(
              'tr',
              null,
              _this2.renderTh(item),
              _react2.default.createElement(
                'td',
                { className: (0, _classnames2.default)({ 'js-img_resize_cf': item.resize }) },
                preview ? null : '<!-- BEGIN_IF [{' + item.name + '@path}/nem] -->',
                _react2.default.createElement('img', { src: '%{ARCHIVES_DIR}{' + item.name + '@path}', className: (0, _classnames2.default)({ 'acms-admin-img-responsive': acmscss, 'js-img_resize_preview': item.resize }), style: item.normalSize ? { width: item.normalSize + 'px' } : null, alt: '{' + item.name + '@alt}' }),
                _react2.default.createElement('input', { type: 'hidden', name: item.name + '{id}@old', value: '{' + item.name + '@path}' }),
                _react2.default.createElement(
                  'div',
                  { className: (0, _classnames2.default)({ 'acms-admin-form-checkbox': acmscss }) },
                  _react2.default.createElement('input', { type: 'checkbox', name: item.name + '{id}@edit', value: 'delete', id: 'input-checkbox-' + item.name + '{id}@edit' }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'input-checkbox-' + item.name + '{id}@edit' },
                    acmscss && _react2.default.createElement('i', { className: 'acms-admin-ico-checkbox' }),
                    '\u524A\u9664'
                  )
                ),
                preview ? null : '<!-- ELSE -->',
                _react2.default.createElement('img', { src: '%{ARCHIVES_DIR}{' + item.name + '@path}', className: (0, _classnames2.default)({ 'acms-admin-img-responsive': acmscss, 'js-img_resize_preview': item.resize }), style: item.normalSize ? { width: item.normalSize + 'px', display: 'none' } : { display: 'none' } }),
                preview ? null : '<!-- END_IF -->',
                _react2.default.createElement('input', { type: 'file', name: item.name + '{id}', size: '20', className: (0, _classnames2.default)({ 'js-img_resize_input': item.resize }) }),
                _react2.default.createElement('br', null),
                item.alt && _react2.default.createElement(
                  _react.Fragment,
                  null,
                  '\u4EE3\u66FF\u30C6\u30AD\u30B9\u30C8:',
                  _react2.default.createElement('input', { type: 'text', name: item.name + '{id}@alt', value: '{' + item.name + '@alt}', size: '40' })
                ),
                _react2.default.createElement('input', { type: 'hidden', name: 'unit{id}[]', value: item.name + '{id}' }),
                _react2.default.createElement('input', { type: 'hidden', name: item.name + '{id}:extension', value: 'image' }),
                item.normalSize && _react2.default.createElement('input', { type: 'hidden', name: item.name + '{id}@' + item.normal, value: item.normalSize }),
                item.tiny && _react2.default.createElement('input', { type: 'hidden', name: item.name + '{id}@' + item.tiny, value: item.tinySize }),
                item.large && _react2.default.createElement('input', { type: 'hidden', name: item.name + '{id}@' + item.large, value: item.largeSize }),
                item.square && _react2.default.createElement('input', { type: 'hidden', name: item.name + '{id}@' + item.square, value: item.squareSize }),
                _react2.default.createElement('input', { type: 'hidden', name: item.name + '{id}@filename', value: '' }),
                _this2.renderValidator(item, acmscss)
              )
            );
          } else if (item.type === 'file') {
            var src = "/images/fileicon/";
            var alt = 'file';
            if (item.extension) {
              src += item.extension + '.gif';
              if (item.extension === 'svg') {
                src = '%{ARCHIVES_DIR}{' + item.name + '@path}';
              }
              alt += item.extension;
            } else {
              src += 'file.gif';
            }

            return _react2.default.createElement(
              'tr',
              null,
              _this2.renderTh(item, acmscss),
              _react2.default.createElement(
                'td',
                null,
                preview ? null : '<!-- BEGIN_IF [{' + item.name + '@path}/nem] -->',
                _react2.default.createElement('input', { type: 'hidden', name: item.name + '{id}@old', value: '{' + item.name + '@path}' }),
                _react2.default.createElement('input', { type: 'hidden', name: item.name + '{id}@secret', value: '{' + item.name + '@secret}' }),
                _react2.default.createElement('input', { type: 'hidden', name: item.name + '{id}@fileSize', value: '{' + item.name + '@fileSize}' }),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'input-checkbox-' + item.name + '{id}@edit', className: (0, _classnames2.default)({ "acms-admin-form-checkbox": acmscss }) },
                  _react2.default.createElement('input', { type: 'checkbox', name: item.name + '{id}@edit', value: 'delete', id: 'input-checkbox-' + item.name + '{id}@edit' }),
                  acmscss && _react2.default.createElement('i', { 'class': 'acms-admin-ico-checkbox' }),
                  '\u524A\u9664'
                ),
                _react2.default.createElement(
                  'a',
                  { href: '%{ARCHIVES_DIR}{' + item.name + '@path}' },
                  _react2.default.createElement('img', { src: src, width: '64', height: '64', alt: alt })
                ),
                preview ? null : '<!-- END_IF -->',
                _react2.default.createElement('input', { type: 'file', name: item.name + '{id}' }),
                _react2.default.createElement('input', { type: 'hidden', name: 'unit{id}[]', value: item.name + '{id}' }),
                _react2.default.createElement('input', { type: 'hidden', name: item.name + '{id}@baseName', value: '{' + item.name + '@baseName}' }),
                _react2.default.createElement('input', { type: 'hidden', name: item.name + '{id}:extension', value: 'file' }),
                item.extension && _react2.default.createElement('input', { type: 'hidden', name: item.name + '{id}@extension', value: item.extension }),
                item.fileNameMethod === 'random' && item.fileName && _react2.default.createElement('input', { type: 'hidden', name: item.name + '{id}@filename', value: '' }),
                item.fileNameMethod === 'fix' && item.fileName && _react2.default.createElement('input', { type: 'hidden', name: item.name + '{id}@filename', value: item.fileName }),
                item.fileNameMethod === 'asis' && _react2.default.createElement('input', { type: 'hidden', name: item.name + '{id}@filename', value: '@rawfilename' }),
                _this2.renderValidator(item, acmscss)
              )
            );
          }
        })
      );
    }
  }]);
  return UnitSource;
}(_react.Component);

exports.default = UnitSource;


UnitSource.defaultProps = {
  preview: false
};