# Setup and Connect Keycloak

_Important: It is necessary to set the `client-authentification` to `true` in the Client in Keycloak to be able to use keycloak connect in nestjs (this implies to use a client secret for the connection)_

## mdsxnrw-realm

In our Realm, the following configurations are set for **dev** mode:

- Keycloak Admin: _{username: admin, password: password}_
- realm-role: _user_
- exampleuser in role _user_: _{username: exampleuser, password: password}_
- client id: _mdsxnrw-client_
- client-secret: _DLKVuzHyhW8DjnnLlrBeYZYHxtFVNRAg_

## Setup Keycloak using an exported Realm JSON-file for dev

- if you want to import a realm during image build to give keycloak a basic configuration, the following points might be useful:
  - to export the desired realm from a running keycloak container, do:
    - ```bash
      docker exec -it keycloakContainer bash
      ```
    - ```bash
      ./opt/keycloak/bin/kc.sh export --file myrealm.json --realm myrealm
      ```
    - copy the generated json by copying `cat myrealm.json` to clipboard or using `docker cp` command
  - in the Dockerfile, make sure you copy the realm.json before running `kc.sh build` command
    ```Dockerfile
    COPY mdsxnrw-realm.json data/import/mdsxnrw-realm.json
    ...
    RUN /opt/keycloak/bin/kc.sh build
    ```
  - Entrypoint in Dockerfile should look like this:
    ```Dockerfile
    ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start-dev", "--import-realm"]
    ```
- IMPORTANT: This Dockerfile is for **dev** mode **only**!

## How to get an Access Token (Bearer)

- _You can use Postman to test the API and generate Access Tokens_
- If you use Postman, use the setting below to get an Access Token:
  - Type: _OAUTH2_
  - Grant Type: _Authorization Code_
  - Auth URL: _KEYCLOAK_URL/realms/mdsxnrw-realm/protocol/openid-connect/auth_
    - _(remind: Maybe you also need to specify the correct port with `:` after the KEYCLOAK_URL)_
  - Access Token URL: _KEYCLOAK_URL/realms/mdsxnrw-realm/protocol/openid-connect/token_
  - Use Client_ID and Client_Secret from the Realm
  - Client Authentification: _Send as Basic Auth Header_

## Connect Keycloak in NestJS

- Set environment variables in apps/mdsxnrw-backend/.env[.default] to point to a valid Keycloak instance
- In the Conctroller classes, make use of `@Role` and other annotations as described in the [documentation](https://www.npmjs.com/package/nest-keycloak-connect) to protect API access

## Make Keycloak ready for production mode

- Change Dockerfile in apps/keycloak:

  - use a proper certificate for production mode
  - in `Entrypoint` run `kc.sh` with `start` arg

- use secrets instead of passwords
