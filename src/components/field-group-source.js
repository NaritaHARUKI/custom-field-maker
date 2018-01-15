import React, { Component } from 'react';
import classnames from 'classnames';

export default class FieldGroupSource extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { groupName, groupTitle, acmscss, groupitems } = this.props;
    return(<div>
    {groupTitle && <h2 className={classnames({'acms-admin-admin-title2': acmscss})}>{groupTitle}</h2>}
    {groupName && <table className={classnames('js-fieldgroup-sortable', {'adminTable acms-admin-table-admin-edit': acmscss})}>
      <thead className={classnames({'acms-admin-hide-sp': acmscss})}>
        <tr>
          <th className={classnames({'acms-admin-table-left acms-admin-admin-config-table-item-handle': acmscss})}>&nbsp;</th>
          {groupitems.map((item) => {
            return(<th className={classnames({'acms-admin-table-left': acmscss})}>
            {item.title}
            {item.tooltip &&<i class="acms-admin-icon-tooltip js-acms-tooltip" data-acms-tooltip="{tooltip}"></i>}
          </th>);
          })}
          <th className={classnames({'acms-admin-table-left acms-admin-admin-config-table-action': acmscss})}>削除</th>
        </tr>
      </thead>
      <tbody>
        {`<!-- BEGIN ${groupName}:loop -->`}
        <tr className="sortable-item">
          <td className="item-handle">
            {acmscss && <i className="acms-admin-icon-sort"></i>}
          </td>
          {groupitems.map((item) => {
            if (item.type === 'text') {
              return (<td>
                <input type="text" name={`${item.name}[]`} value={`{${item.name}}`} className={classnames({'acms-admin-form-width-full': acmscss})} />
              </td>);
            } else if (item.type === 'textarea') {
              return (<td>
                <textarea name={`${item.name}[]`} className={classnames({'acms-admin-form-width-full': acmscss})}>{`{${item.name}}`}</textarea>
              </td>);
            } else if (item.type === 'select') {
              return (<td>
                <select name={`${item.name}[]`} className={classnames({'acms-admin-form-width-full': acmscss})}>
                  <option value=""></option>
                  {item.option.map((option) => {
                    if (!option.label) {
                      return null;
                    }
                    return <option value={option.value} data-tmp={`{${item.name}:selected#${option.value}}`}>{option.label}</option>
                  })}
                </select>
              </td>);
            } else if (item.type === 'radio') {
              return (<td>
                {item.option.map((option) => {
                  if (!option.label) {
                    return null;
                  }
                  return (<div className={classnames({'acms-admin-form-radio': acmscss})}>
                    <input type="radio" name={`${item.name}[]`} value={item.value} data-tmp={`{${item.name}:checked#${option.value}}`} id={`input-radio-${item.name}-${option.value}`}/>
					          <label htmlFor={`input-radio-${item.name}-${option.value}`}>
                      {acmscss && <i class="acms-admin-ico-radio"></i>}
                      {label}
                    </label>
                  </div>);
                })}
              </td>);
            } else if (item.type === 'file') {
              let src = "/images/fileicon/";
              let alt = 'file';
              if (item.extension) {
                src += `${extension}.gif`;
                alt += extension;
              } else {
                src += 'file.gif';
              }

              return (<td>
                {`<!-- BEGIN_IF [{${item.name}@path}/nem] -->`}
                <div className={classnames({'acms-admin-form-checkbox': acmscss})}>
                  <input type="checkbox" name={`${item.name}@edit[]`} value="delete" id={`input-checkbox-${item.name}@edit`}/>
                  <label for="input-checkbox-{name}@edit">
                  {acmscss && <i class="acms-admin-ico-checkbox"></i>} 削除</label>
                </div>
                <a href={`%{ARCHIVES_DIR}{${item.name}@path}`}>
                  <img src={src} width="64" height="64" alt={alt} />
                </a>
                {`<!-- END_IF -->`}
                <input type="hidden" name="{name}@old[]" value={`{${item.name}@path}`} />
                <input type="file" name="{name}[]"/><br />
                {`<!-- BEGIN alt:veil -->`}
                  代替テキスト:
                  <input type="text" name={`${item.name}@alt[]`} value={`{${item.name}@alt}`} size="40" />
                {`<!-- END alt:veil -->`}
              </td>)
            } else if (item.type === 'image') {
              const style = {};
              if (item.normalSize) {
                style.width = `${item.normalSize}px`;
              } 
              const hiddenStyle = Object.assign({}, style, {'display': 'none'});

              return (<td className={classnames({'js-img_resize_cf': item.resize})}>
                {`<!-- BEGIN_IF [{${item.name}@path}/nem] -->`}
                <div>
                  <img 
                    src={`%{ARCHIVES_DIR}{${item.name}@${item.path}}`} 
                    className={classnames({'js-img_resize_preview': item.resize})} style={style} />
				        </div>
				        <input type="hidden" name="{name}@old[]" value={`{${item.name}@path}`} />
                {`<!-- ELSE -->`}
                  <img 
                    src={`%{ARCHIVES_DIR}{${item.name}@${item.path}}`} 
                    className={classnames({'js-img_resize_preview': item.resize})} style={hiddenStyle}/>
                {`<!-- END_IF -->`}
                <input type="file" name={`${item.name}[]`} className={classnames({'js-img_resize_input': item.resize})} /><br />
                {`<!-- BEGIN alt:veil -->`}
                代替テキスト:<input type="text" name="{name}@alt[]" value={`{${item.name}@alt}`} size="40" />
                {`<!-- END alt:veil -->`}
                {`<!-- BEGIN normalSize:veil -->`}
                <input type="hidden" name={`${item.name}@${item.normal}[]`} value="{normalSize}" />
                {`<!-- END normalSize:veil -->`}
                {`<!-- BEGIN tiny:veil -->`}
                <input type="hidden" name={`${item.name}@${item.tiny}[]`} value="{tinySize}" />
                {`<!-- END tiny:veil -->`}
                {`<!-- BEGIN large:veil -->`}
                <input type="hidden" name={`${item.name}@${item.large}[]`} value="{largeSize}" />
                {`<!-- END large:veil -->`}
                {`<!-- BEGIN square:veil -->`}
                <input type="hidden" name={`${item.name}@${item.square}[]`} value="{squareSize}" />
                {`<!-- END square:veil -->`}
              </td>)
            }
          })}
        </tr>
        {`<!-- END ${groupName}:loop -->`}
      </tbody>
    </table>}
    </div>);
  }
}