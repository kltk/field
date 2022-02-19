import { defaults, get } from 'lodash';
import React, { Component } from 'react';
import shallowEqual from 'shallowequal';
import { ControlProps, InputChangeEvent, RenderOptions } from '../types';
import { cloneNode } from '../utils/cloneNode';
import { defaultNormalize } from '../utils/defaultNormalize';
import { getOnlyChild } from '../utils/getOnlyChild';

type ControlAdapterProps<Value> = ControlProps<Value> & RenderOptions;

/**
 * 表单控件适配器
 * - 将标准的 value/onChange 转换为组件实际使用的 props
 * - 弱受控模式解决输入法的问题
 *
 * @example
 * ```
 * <ControlAdapter
 *  valueName={valueName}
 *  value={value}
 *  trigger={trigger}
 *  normalize={normalize}
 *  onChange={onChange}
 *  {...rest}
 * >
 *  <input />
 * </ControlAdapter>
 * 输出:
 * <input
 *  [valueName]={value}
 *  [trigger]={e => onChange(normalize(e))}
 *  {...rest}
 * />
 * ```
 */
class ControlAdapter<Value> extends Component<ControlAdapterProps<Value>> {
  static defaultProps = {
    trigger: 'onChange',
    normalize: defaultNormalize,
    valueName: 'value',
  };

  state = {
    value: this.props.value,
  };

  shouldComponentUpdate(
    nextProps: ControlAdapterProps<Value>,
    nextState: ControlAdapterProps<Value>,
  ) {
    if (this.props.value !== nextProps.value)
      if (nextState.value !== nextProps.value)
        this.setState({ value: nextProps.value });

    if (nextState.value !== this.state.value) {
      return true;
    }

    if (!shallowEqual(this.props, nextProps)) {
      return true;
    }

    return false;
  }

  handleChange = async (e: Value | InputChangeEvent) => {
    const { trigger, normalize, onChange } = this.props;
    const { children } = this.props;
    const control = getOnlyChild(children);
    const originTrigger = get(control, ['props', trigger!]);

    let value;
    if (normalize instanceof Function) {
      value = normalize(e);
    } else if (typeof normalize === 'string') {
      value = get(e, normalize);
    } else {
      value = e;
    }

    await Promise.all([
      this.setState({ value }),
      onChange && onChange(value),
      // 支持控件原来的回调
      originTrigger && originTrigger(e),
    ]);
  };

  render() {
    const { trigger, normalize, onChange, ...rest } = this.props;
    const { valueName, value: _1, children, ...restProps } = rest;
    const { value } = this.state;

    const control = React.Children.only(children) as React.ReactElement;

    const newProps = {
      [trigger!]: this.handleChange,
      [valueName!]: value,
    };
    defaults(newProps, control.props, restProps);
    return cloneNode(control, newProps);
  }
}

export default ControlAdapter;
