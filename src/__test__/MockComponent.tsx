import type { PropsWithChildren } from 'react';

type MockComponentProps = {
    name: string;
    data?: Record<string, unknown>;
};

const MockComponent = ({ name, data, children }: PropsWithChildren<MockComponentProps>) => {
    const { children: _ignored, ...dataWithoutChildren } = data ?? {};

    return (
        <div className='MockComponent' data-testid={`MockComponent-${name}`}>
            <div>{name}</div>
            {data && <div>{JSON.stringify(dataWithoutChildren)}</div>}
            <div>{children}</div>
        </div>
    );
};

export default MockComponent;
