import React from 'react';
import { mock, shallow } from 'enzyme';
import ProviderMock from '../../mocks/ProviderMock';
import Header from '../../components/Header';

describe('<Header />', () => {
  test('El componentes se renderiza', () => {
    const header = shallow(
      <ProviderMock>
        <Header />
      </ProviderMock>,
    );
    expect(header.length).toEqual(1);
  });
});
