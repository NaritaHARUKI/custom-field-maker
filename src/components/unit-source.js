import React, { Component, Fragment } from 'react';
import classnames from 'classnames';

export default class UnitSource extends Component {

  constructor(props) {
    super(props);
  }

  renderValidator(item, acmscss) {
    if (!item.openValidator) {
      return null;
    }
    const name = item.type === 'file' || item.type === 'image' ? `${item.name}@path` : item.name;

    return (
      <Fragment>
      {item.validator.map((validator) => {
        if (!validator.option) {
          return null;
        }
        return (<Fragment>
          <input type="hidden" name={`${name}:v#${validator.option}`} value={validator.value} />
          {validator.message && <Fragment>
          {`<!-- BEGIN ${name}:validator#${validator.option} -->`}
            <p className={classnames({ "acms-admin-text-error": acmscss })}>{validator.message}</p>
          {`<!-- END ${name}:validator#${validator.option} -->`}
          </Fragment>}
        {item.converter && <input type="hidden" name={`${name}:c`} value={item.converter}/>}
        </Fragment>);
      })}
      </Fragment>
    );
  }

  renderNoSearch(item) {
    if (!item.noSearch) {
      return null;
    }
    return (
      <input type="hidden" name={`${item.name}:search`} value="0" />
    );
  }

  renderTh(item) {
    return (
      <th>
        {item.title}
        {item.tooltip &&
          <i className="acms-admin-icon-tooltip js-acms-tooltip" data-acms-tooltip={item.tooltip}></i>
        }
      </th>
    )
  }

  render() {
    const { acmscss, customunit, preview } = this.props;
    return (
      <table className={classnames({ 'acms-admin-table-admin-edit': acmscss })}>
        {customunit.map(item => {
          if (item.type === 'text') {
            return(<tr>
              {this.renderTh(item, acmscss)}
              <td>
                <input type="text" name={`${item.name}{id}`} value={`{${item.name}}`} className={classnames({ 'acms-admin-form-width-full': acmscss })} />
                <input type="hidden" name="unit{id}[]" value={`${item.name}{id}`} />
                {this.renderValidator(item, acmscss)}
                {this.renderNoSearch(item)}
              </td>
            </tr>);
          } else if (item.type === 'textarea') {
            return (
              <tr>
                {this.renderTh(item, acmscss)}
                <td>
                  <textarea name={`${item.name}{id}`} className={classnames({"acms-admin-form-width-full":acmscss})}>{`{${item.name}}`}</textarea>
                  <input type="hidden" name="unit{id}[]" value={`${item.name}{id}`} />
                  {this.renderValidator(item, acmscss)}
                </td>
              </tr>
            );
          } else if (item.type === 'select') {
            return (
              <tr>
                {this.renderTh(item, acmscss)}
                <td>
                  <select name={`${item.name}{id}`} className={classnames({"acms-admin-form-width-full":acmscss})}>
                    <option value=""></option>
                    {item.option.map(option => {
                      if (!option.label) {
                        return null;
                      } else {
                        return <option value={option.value} data-tmp={`{${item.name}:selected#${option.value}}`}>{option.label}</option>
                      }
                    })}
                  </select>
                  <input type="hidden" name="unit{id}[]" value={`${item.name}{id}`} />
                  {this.renderValidator(item, acmscss)}
                </td>
              </tr>
            );
          } else if (item.type === 'radio') {
            return (
              <tr>
                {this.renderTh(item)}
                <td>
                  {item.option.map(option => {
                    if (!option.label) {
                      return null;
                    } else {
                      return (
                        <div className={classnames({"acms-admin-form-radio":acmscss})}>
                          <input type="radio" name={`${item.name}{id}`} value={option.value} data-tmp={`{${item.name}:checked#${option.value}}`} id={`input-radio-${item.name}-${option.value}-{id}`} />
                          <label htmlFor={`input-radio-${item.name}-${option.value}-{id}`}>
                            <i className="acms-admin-ico-radio"></i>
                            {option.label}
                          </label>
                        </div>
                      )
                    }
                  })}
                  <input type="hidden" name="unit{id}[]" value={`${item.name}{id}`} />
                  {this.renderValidator(item, acmscss)}
                </td>
              </tr>
            );
          } else if (item.type === 'checkbox') {
            return (
              <tr>
                {this.renderTh(item)}
                <td>
                  {item.option.map(option => {
                    if (!option.label) {
                      return null;
                    } else {
                      return (
                        <div className={classnames({"acms-admin-form-checkbox":acmscss})}>
                          <input type="checkbox" name={`${item.name}{id}[]`} value={option.value} data-tmp={`{${item.name}:checked#${option.value}}`} id={`input-checkbox-${item.name}-${option.value}-{id}`} />
                          <label htmlFor={`input-checkbox-${item.name}-${option.value}-{id}`}>
                            <i className="acms-admin-ico-checkbox"></i>
                            {option.label}
                          </label>
                        </div>
                      )
                    }
                  })}
                  <input type="hidden" name="unit{id}[]" value={`${item.name}{id}`} />
                  {this.renderValidator(item, acmscss)}
                </td>
              </tr>
            );
          } else if (item.type === 'image') {
            return (<tr>
              {this.renderTh(item)}
              <td className={classnames({'js-img_resize_cf': item.resize})}>
              {preview ? null : `<!-- BEGIN_IF [{${item.name}@path}/nem] -->`}
              <img src={`%{ARCHIVES_DIR}{${item.name}@path}`} className={classnames({'acms-admin-img-responsive': acmscss, 'js-img_resize_preview': item.resize})} style={item.normalSize ? {width: `${item.normalSize}px`} : null} alt={`{${item.name}@alt}`} />
              <input type="hidden" name={`${item.name}{id}@old`} value={`{${item.name}@path}`} />
              <div className={classnames({'acms-admin-form-checkbox':acmscss})}>
                <input type="checkbox" name={`${item.name}{id}@edit`} value="delete" id={`input-checkbox-${item.name}{id}@edit`} />
                <label htmlFor={`input-checkbox-${item.name}{id}@edit`}>
                  {acmscss &&
                    <i className="acms-admin-ico-checkbox"></i>
                  }
                  削除
                </label>
              </div>
              {preview ? null : `<!-- ELSE -->`}
              <img src={`%{ARCHIVES_DIR}{${item.name}@path}`} className={classnames({'acms-admin-img-responsive': acmscss, 'js-img_resize_preview': item.resize})} style={item.normalSize ? {width: `${item.normalSize}px`, display: 'none'} : {display: 'none'}} />
              {preview ? null : `<!-- END_IF -->`}
              <input type="file" name={`${item.name}{id}`} size="20" className={classnames({'js-img_resize_input': item.resize})} /><br />
              {item.alt && <Fragment>代替テキスト:<input type="text" name={`${item.name}{id}@alt`} value={`{${item.name}@alt}`} size="40" /></Fragment>}
              <input type="hidden" name="unit{id}[]" value={`${item.name}{id}`} />
              <input type="hidden" name={`${item.name}{id}:extension`} value="image" />
              {item.normalSize && <input type="hidden" name={`${item.name}{id}@${item.normal}`} value={item.normalSize} />}
              {item.tiny && <input type="hidden" name={`${item.name}{id}@${item.tiny}`} value={item.tinySize} />}
              {item.large && <input type="hidden" name={`${item.name}{id}@${item.large}`} value={item.largeSize} />}
              {item.square && <input type="hidden" name={`${item.name}{id}@${item.square}`} value={item.squareSize} />}
              <input type="hidden" name={`${item.name}{id}@filename`} value="" />
              {this.renderValidator(item, acmscss)}
            </td>
          </tr>);
          } else if (item.type === 'file') {
            let src = "/images/fileicon/";
            let alt = 'file';
            if (item.extension) {
              src += `${item.extension}.gif`;
              if (item.extension === 'svg') {
                src = `%{ARCHIVES_DIR}{${item.name}@path}`;
              }
              alt += item.extension;
            } else {
              src += 'file.gif';
            }

            return (<tr>
              {this.renderTh(item, acmscss)}
              <td>
                {preview ? null : `<!-- BEGIN_IF [{${item.name}@path}/nem] -->`}
                <input type="hidden" name={`${item.name}{id}@old`} value={`{${item.name}@path}`} />
                <input type="hidden" name={`${item.name}{id}@secret`} value={`{${item.name}@secret}`} />
                <input type="hidden" name={`${item.name}{id}@fileSize`} value={`{${item.name}@fileSize}`} />
                <label htmlFor={`input-checkbox-${item.name}{id}@edit`} className={classnames({"acms-admin-form-checkbox": acmscss})}>
                  <input type="checkbox" name={`${item.name}{id}@edit`} value="delete" id={`input-checkbox-${item.name}{id}@edit`} />
                  {acmscss && <i class="acms-admin-ico-checkbox"></i>}
                  削除
                </label>
                <a href={`%{ARCHIVES_DIR}{${item.name}@path}`}><img src={src} width="64" height="64" alt={alt} /></a>
                {preview ? null : `<!-- END_IF -->`}
                <input type="file" name={`${item.name}{id}`} />
                <input type="hidden" name="unit{id}[]" value={`${item.name}{id}`} />
                <input type="hidden" name={`${item.name}{id}@baseName`} value={`{${item.name}@baseName}`} />
                <input type="hidden" name={`${item.name}{id}:extension`} value="file" />
                {item.extension && <input type="hidden" name={`${item.name}{id}@extension`} value={item.extension} />}
                {item.fileNameMethod === 'random' && item.fileName && <input type="hidden" name={`${item.name}{id}@filename`} value="" />}
                {item.fileNameMethod === 'fix' && item.fileName && <input type="hidden" name={`${item.name}{id}@filename`} value={item.fileName} />}
                {item.fileNameMethod === 'asis' && <input type="hidden" name={`${item.name}{id}@filename`} value="@rawfilename" />}
                {this.renderValidator(item, acmscss)}
              </td>
            </tr>);
          }
        })}
      </table>
    )
  }
}

UnitSource.defaultProps = {
  preview: false
}
