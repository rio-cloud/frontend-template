import MockComponent from '../../__test__/MockComponent';
import { testRender } from '../../__test__/testUtils';
import type { RootState } from '../../configuration/setup/store';
import messagesDE from '../../features/translations/de-DE.json';
import AppLayout from '../AppLayout';

vi.mock('@rio-cloud/iframe-resizer', () => ({
    // @ts-expect-error Several components on this level are using the iframe-resizer
    default: props => <MockComponent name='IframeResizer' data={props} />,
}));

describe('Test AppLayout', () => {
    it('Application layout is rendered', async () => {
        const { findByTestId } = testRender(<AppLayout />);

        expect(await findByTestId('app-layout')).toBeInTheDocument();
        const iframeResizer = await findByTestId('MockComponent-IframeResizer');
        expect(iframeResizer).toHaveTextContent('"className":"iFrameResizer"');
        expect(iframeResizer).toHaveTextContent('"title":"RIO menu"');
        expect(iframeResizer).not.toHaveTextContent('"direction"');
        expect(iframeResizer).not.toHaveTextContent('"protocol"');
    });

    it('Application layout renders with a preloaded store', async () => {
        // Define the preloaded state for the test
        const preloadedState: Partial<RootState> = {
            lang: {
                // This initial state gets changed when loading the app due to local
                // lang settings VITE_LOGIN_MOCK_LOCALE in the .env file
                displayLocale: 'de-DE',
                allMessages: { 'de-DE': messagesDE },
                displayMessages: messagesDE,
            },
        };

        const { findByTestId, getByText } = testRender(<AppLayout />, preloadedState);

        expect(await findByTestId('app-layout')).toBeInTheDocument();
        expect(getByText('Introduction')).toBeInTheDocument();
    });
});
