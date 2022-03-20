import React from 'react';

describe('bugs', () => {
  /**
   * 在 useSelector 里
   * 从输入框触发事件到控件重新渲染的过程应该是同步的
   * 如果有异步会导致这个bug
   *
   * 如果改成同步的，会有以下提示
   * Warning: Cannot update a component (`FieldListInner`) while rendering a different component (`Group`).
   * To locate the bad setState() call inside `Group`, follow the stack trace as described in
   */
  it('异步更新导致的中文输入bug', () => {
    //
  });

  /**
   * 现有的 reset 逻辑是
   * reset 时会先设置表单值为 undefined，然后渲染表单
   * 渲染完后再根据 Field#initial 更新值
   * 导致第一次渲染时表单项的值为 undefined
   */
  it('设置 Field#initial 后还是在 reset 时收到受控提示', () => {
    //
  });
});
