<h1>
  <img src="https://cdn.rio.cloud/images/favicon/apple-touch-icon.png" alt="RIO logo" width="28" />
  RIO Frontend template
</h1>

## Summary

This is the default template for new frontend projects. It uses Vite, TypeScript, React, our shared components and
utilities, and a range of other standard tooling and libraries.

⚠️ **It is recommended that you do not clone this repository directly. Instead, use the
[create-frontend](https://github.com/rio-cloud/create-frontend) CLI, as it will automatically prompt you for the
correct values needed to fill in the template.**

If you do use this repository directly, note that some placeholders are intended to be replaced during project
creation. In particular, make sure you provide values for:

- OAuth *ClientID*
- OAuth *redirect_uri*
- Sentry *DSN*

If you only want a small local toy project that lets you explore UIKIT components, dummy values are sufficient.

Once that is done, remove this section and replace it with your own project-specific README 🦄

_Note, even though it is technically ignored, please make sure to update the list of OAuth scopes in [src/config.ts](src/config.ts)._

## Directory structure

A short explanation of what each folder is intended for:

- **src**
    - **assets**: The folder for all kinds of assets, such as images, videos, and similar files.
    - **components**: All service-specific components that are used multiple times across the service. These
      components are generic and reusable. They do not belong to a specific feature. A good example would be a custom
      input component with validation that is used by various features, for example in different forms.
    - **configuration**: Service configuration such as login, token handling, language settings, or general setup files
      such as the Redux store.
    - **data**: All relevant files for data definitions that are used by the service; for example table
      configurations, initial service data or configuration, date formatters, currencies, and similar utilities.
    - **features**: The folder for all feature-specific code. Each feature should live in a dedicated subfolder that
      co-locates all feature-relevant files. Examples include headers, sidebars, maps, trees, user lists, tables,
      and forms. Features should be fairly isolated and should not interact heavily with other features. This makes
      them easier to replace, remove, or change. Features are then combined on pages.
    - **hooks**: All custom hooks used across the project.
    - **layout**: The folder for the overall layouts as defined in `App.tsx`.
    - **pages**: The folder for all navigable service pages. Pages are composed of features and components. In the
      frontend template, these are the "intro" and "more" pages. This generally represents what is defined as routes
      in the header, although in some cases it can also include subpages.
    - **routes**: All route-related files such as route definitions, route updaters, route hooks, and similar logic.
    - **services**: All service API connections, Redux Toolkit Query APIs or thunks, converters, model types, and similar service-related code.
    - **utils**: Common utility files and functions.
- **test**
    - **integration**: All integration tests.
    - **utils**: Utility functions that can be used in integration or unit tests.

Note: There is no dedicated root folder for all the type files on purpose, as we believe that the typings should be
co-located to the files where they originate from. This means that component types belong to the respective component
folder, model types belong to the respective API in the service folder, etc.

## Tech stack

The RIO template is opinionated and already comes with a number of predefined libraries to give you a head start and
to make different projects feel more familiar when developers move between them. If you still want to use something
else, feel free to remove or adapt the sample implementations.

- *Build tooling*:
    - [Vite](https://vitejs.dev/)
- *Frontend library*:
    - [React](https://reactjs.org/)
- *Routing*:
    - [React Router](https://github.com/remix-run/react-router)
- *State management*:
    - [Redux Toolkit](https://redux-toolkit.js.org/)
- *Data fetching*:
    - [RTK Query](https://redux-toolkit.js.org/rtk-query/overview), since it is part of the same ecosystem as Redux
- *UI component library*:
    - [RIO UIKIT](https://uikit.developers.rio.cloud)
- *Form validation*:
    - [React Hook Form](https://react-hook-form.com/)
- *Date library*:
    Even though there are still some older UIKIT components that use moment.js, the date-fns library is intended to
    replace it in our services over time.
    - [date-fns](https://date-fns.org/)
- *Testing*:
    - [Vitest](https://vitest.dev//) as the test runner and testing framework for unit tests
    - [Testing Library](https://testing-library.com/) as the testing utility
    - [Playwright](https://playwright.dev/) as the integration, end-to-end, and monitoring test suite
- *API mocking*:
    - [MSW](https://mswjs.io/) to mock API calls by intercepting requests on the network level. This can be used for
      both development and testing
- *Localization*:
    - [react-intl](https://formatjs.io/docs/react-intl/) as the i18n library
    - [Phrase](https://phrase.com/cli/) for managing translations with Phrase
- *Service monitoring and issue tracking*:
    - [Sentry](https://sentry.io/)
- *Static code analysis and formatting*:
    - [Biome](https://biomejs.dev/)
- *Automated dependency updates*:
    - [Renovate](https://docs.renovatebot.com/) with a basic configuration file; any further configuration still needs
      to be customized
