import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCar1BodyCar1Body extends Schema.CollectionType {
  collectionName: 'car1_bodies';
  info: {
    singularName: 'car1-body';
    pluralName: 'car1-bodies';
    displayName: 'car1_body';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    header: Attribute.Text;
    body: Attribute.Text;
    expertise_cart_1: Attribute.Relation<
      'api::car1-body.car1-body',
      'manyToOne',
      'api::expertise-cart1.expertise-cart1'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::car1-body.car1-body',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::car1-body.car1-body',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCar1SwitcherCar1Switcher extends Schema.CollectionType {
  collectionName: 'car1_switchers';
  info: {
    singularName: 'car1-switcher';
    pluralName: 'car1-switchers';
    displayName: 'car1_switcher';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    body: Attribute.String;
    expertise_cart_1: Attribute.Relation<
      'api::car1-switcher.car1-switcher',
      'manyToOne',
      'api::expertise-cart1.expertise-cart1'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::car1-switcher.car1-switcher',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::car1-switcher.car1-switcher',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDevArcFooterDevArcFooter extends Schema.CollectionType {
  collectionName: 'dev_arc_footers';
  info: {
    singularName: 'dev-arc-footer';
    pluralName: 'dev-arc-footers';
    displayName: 'Dev-arcFooter';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    arcclass: Attribute.String;
    iconarc: Attribute.Text;
    development: Attribute.Relation<
      'api::dev-arc-footer.dev-arc-footer',
      'manyToOne',
      'api::development.development'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dev-arc-footer.dev-arc-footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dev-arc-footer.dev-arc-footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDevArcHeaderDevArcHeader extends Schema.CollectionType {
  collectionName: 'dev_arc_headers';
  info: {
    singularName: 'dev-arc-header';
    pluralName: 'dev-arc-headers';
    displayName: 'Dev-arcHeader';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    arcclass: Attribute.String;
    iconarc: Attribute.Text;
    development: Attribute.Relation<
      'api::dev-arc-header.dev-arc-header',
      'manyToOne',
      'api::development.development'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dev-arc-header.dev-arc-header',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dev-arc-header.dev-arc-header',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDevCaseDevCase extends Schema.CollectionType {
  collectionName: 'dev_cases';
  info: {
    singularName: 'dev-case';
    pluralName: 'dev-cases';
    displayName: 'DevCase';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    h4: Attribute.String;
    li: Attribute.Text;
    h6: Attribute.Text;
    p: Attribute.Text;
    url: Attribute.String;
    image: Attribute.String;
    img: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dev-case.dev-case',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dev-case.dev-case',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDevStepsDevDevStepsDev extends Schema.CollectionType {
  collectionName: 'dev_steps_devs';
  info: {
    singularName: 'dev-steps-dev';
    pluralName: 'dev-steps-devs';
    displayName: 'Dev-stepsDev';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    number: Attribute.String;
    title: Attribute.String;
    iconstep: Attribute.Text;
    description: Attribute.Text;
    development: Attribute.Relation<
      'api::dev-steps-dev.dev-steps-dev',
      'manyToOne',
      'api::development.development'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dev-steps-dev.dev-steps-dev',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dev-steps-dev.dev-steps-dev',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDevelopmentDevelopment extends Schema.CollectionType {
  collectionName: 'developments';
  info: {
    singularName: 'development';
    pluralName: 'developments';
    displayName: 'Development';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    dev_arc_headers: Attribute.Relation<
      'api::development.development',
      'oneToMany',
      'api::dev-arc-header.dev-arc-header'
    >;
    dev_arc_footers: Attribute.Relation<
      'api::development.development',
      'oneToMany',
      'api::dev-arc-footer.dev-arc-footer'
    >;
    dev_steps_devs: Attribute.Relation<
      'api::development.development',
      'oneToMany',
      'api::dev-steps-dev.dev-steps-dev'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::development.development',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::development.development',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiExpertiseCart1ExpertiseCart1 extends Schema.CollectionType {
  collectionName: 'expertise_cart1s';
  info: {
    singularName: 'expertise-cart1';
    pluralName: 'expertise-cart1s';
    displayName: 'Expertise_cart1';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    header: Attribute.String;
    car_1_bodies: Attribute.Relation<
      'api::expertise-cart1.expertise-cart1',
      'oneToMany',
      'api::car1-body.car1-body'
    >;
    car_1_switchers: Attribute.Relation<
      'api::expertise-cart1.expertise-cart1',
      'oneToMany',
      'api::car1-switcher.car1-switcher'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::expertise-cart1.expertise-cart1',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::expertise-cart1.expertise-cart1',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiExpertiseCart2ExpertiseCart2 extends Schema.CollectionType {
  collectionName: 'expertise_cart2s';
  info: {
    singularName: 'expertise-cart2';
    pluralName: 'expertise-cart2s';
    displayName: 'Expertise_cart2';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    header: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::expertise-cart2.expertise-cart2',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::expertise-cart2.expertise-cart2',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiExpertiseCart3ExpertiseCart3 extends Schema.CollectionType {
  collectionName: 'expertise_cart3s';
  info: {
    singularName: 'expertise-cart3';
    pluralName: 'expertise-cart3s';
    displayName: 'Expertise_cart3';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    header: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::expertise-cart3.expertise-cart3',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::expertise-cart3.expertise-cart3',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiExpertiseCart4ExpertiseCart4 extends Schema.CollectionType {
  collectionName: 'expertise_cart4s';
  info: {
    singularName: 'expertise-cart4';
    pluralName: 'expertise-cart4s';
    displayName: 'Expertise_cart4';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    header: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::expertise-cart4.expertise-cart4',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::expertise-cart4.expertise-cart4',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIiIi extends Schema.CollectionType {
  collectionName: 'iis';
  info: {
    singularName: 'ii';
    pluralName: 'iis';
    displayName: 'Ii';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    ii_arc_headers: Attribute.Relation<
      'api::ii.ii',
      'oneToMany',
      'api::ii-arc-header.ii-arc-header'
    >;
    ii_steps_devs: Attribute.Relation<
      'api::ii.ii',
      'oneToMany',
      'api::ii-steps-dev.ii-steps-dev'
    >;
    ii_arc_footers: Attribute.Relation<
      'api::ii.ii',
      'oneToMany',
      'api::ii-arc-footer.ii-arc-footer'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::ii.ii', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::ii.ii', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiIiArcFooterIiArcFooter extends Schema.CollectionType {
  collectionName: 'ii_arc_footers';
  info: {
    singularName: 'ii-arc-footer';
    pluralName: 'ii-arc-footers';
    displayName: 'Ii-arcFooter';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    arcclass: Attribute.String;
    iconarc: Attribute.Text;
    ii: Attribute.Relation<
      'api::ii-arc-footer.ii-arc-footer',
      'manyToOne',
      'api::ii.ii'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ii-arc-footer.ii-arc-footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ii-arc-footer.ii-arc-footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIiArcHeaderIiArcHeader extends Schema.CollectionType {
  collectionName: 'ii_arc_headers';
  info: {
    singularName: 'ii-arc-header';
    pluralName: 'ii-arc-headers';
    displayName: 'Ii-arcHeader';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    arcclass: Attribute.String;
    iconarc: Attribute.Text;
    ii: Attribute.Relation<
      'api::ii-arc-header.ii-arc-header',
      'manyToOne',
      'api::ii.ii'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ii-arc-header.ii-arc-header',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ii-arc-header.ii-arc-header',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIiStepsDevIiStepsDev extends Schema.CollectionType {
  collectionName: 'ii_steps_devs';
  info: {
    singularName: 'ii-steps-dev';
    pluralName: 'ii-steps-devs';
    displayName: 'Ii-stepsDev';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    number: Attribute.String;
    title: Attribute.String;
    iconstep: Attribute.Text;
    description: Attribute.Text;
    ii: Attribute.Relation<
      'api::ii-steps-dev.ii-steps-dev',
      'manyToOne',
      'api::ii.ii'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ii-steps-dev.ii-steps-dev',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ii-steps-dev.ii-steps-dev',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiModArcFooterModArcFooter extends Schema.CollectionType {
  collectionName: 'mod_arc_footers';
  info: {
    singularName: 'mod-arc-footer';
    pluralName: 'mod-arc-footers';
    displayName: 'Mod-arcFooter';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    arcclass: Attribute.String;
    iconarc: Attribute.Text;
    modification: Attribute.Relation<
      'api::mod-arc-footer.mod-arc-footer',
      'manyToOne',
      'api::modification.modification'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::mod-arc-footer.mod-arc-footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::mod-arc-footer.mod-arc-footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiModArcHeaderModArcHeader extends Schema.CollectionType {
  collectionName: 'mod_arc_headers';
  info: {
    singularName: 'mod-arc-header';
    pluralName: 'mod-arc-headers';
    displayName: 'Mod-arcHeader';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    arcclass: Attribute.String;
    iconarc: Attribute.Text;
    modification: Attribute.Relation<
      'api::mod-arc-header.mod-arc-header',
      'manyToOne',
      'api::modification.modification'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::mod-arc-header.mod-arc-header',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::mod-arc-header.mod-arc-header',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiModStepsDevModStepsDev extends Schema.CollectionType {
  collectionName: 'mod_steps_devs';
  info: {
    singularName: 'mod-steps-dev';
    pluralName: 'mod-steps-devs';
    displayName: 'Mod-stepsDev';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    number: Attribute.String;
    title: Attribute.String;
    iconstep: Attribute.Text;
    description: Attribute.Text;
    modification: Attribute.Relation<
      'api::mod-steps-dev.mod-steps-dev',
      'manyToOne',
      'api::modification.modification'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::mod-steps-dev.mod-steps-dev',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::mod-steps-dev.mod-steps-dev',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiModificationModification extends Schema.CollectionType {
  collectionName: 'modifications';
  info: {
    singularName: 'modification';
    pluralName: 'modifications';
    displayName: 'Modification';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    mod_arc_footers: Attribute.Relation<
      'api::modification.modification',
      'oneToMany',
      'api::mod-arc-footer.mod-arc-footer'
    >;
    mod_steps_devs: Attribute.Relation<
      'api::modification.modification',
      'oneToMany',
      'api::mod-steps-dev.mod-steps-dev'
    >;
    mod_arc_headers: Attribute.Relation<
      'api::modification.modification',
      'oneToMany',
      'api::mod-arc-header.mod-arc-header'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::modification.modification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::modification.modification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMvpMvp extends Schema.CollectionType {
  collectionName: 'mvps';
  info: {
    singularName: 'mvp';
    pluralName: 'mvps';
    displayName: 'MVP';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    mvp_arc_headers: Attribute.Relation<
      'api::mvp.mvp',
      'oneToMany',
      'api::mvp-arc-header.mvp-arc-header'
    >;
    mvp_steps_devs: Attribute.Relation<
      'api::mvp.mvp',
      'oneToMany',
      'api::mvp-steps-dev.mvp-steps-dev'
    >;
    mvp_arc_footers: Attribute.Relation<
      'api::mvp.mvp',
      'oneToMany',
      'api::mvp-arc-footer.mvp-arc-footer'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::mvp.mvp', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::mvp.mvp', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiMvpArcFooterMvpArcFooter extends Schema.CollectionType {
  collectionName: 'mvp_arc_footers';
  info: {
    singularName: 'mvp-arc-footer';
    pluralName: 'mvp-arc-footers';
    displayName: 'Mvp-arcFooter';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    arcclass: Attribute.String;
    iconarc: Attribute.Text;
    mvp: Attribute.Relation<
      'api::mvp-arc-footer.mvp-arc-footer',
      'manyToOne',
      'api::mvp.mvp'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::mvp-arc-footer.mvp-arc-footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::mvp-arc-footer.mvp-arc-footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMvpArcHeaderMvpArcHeader extends Schema.CollectionType {
  collectionName: 'mvp_arc_headers';
  info: {
    singularName: 'mvp-arc-header';
    pluralName: 'mvp-arc-headers';
    displayName: 'Mvp-arcHeader';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    arcclass: Attribute.String;
    iconarc: Attribute.Text;
    mvp: Attribute.Relation<
      'api::mvp-arc-header.mvp-arc-header',
      'manyToOne',
      'api::mvp.mvp'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::mvp-arc-header.mvp-arc-header',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::mvp-arc-header.mvp-arc-header',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMvpStepsDevMvpStepsDev extends Schema.CollectionType {
  collectionName: 'mvp_steps_devs';
  info: {
    singularName: 'mvp-steps-dev';
    pluralName: 'mvp-steps-devs';
    displayName: 'Mvp-stepsDev';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    number: Attribute.String;
    title: Attribute.String;
    iconstep: Attribute.Text;
    description: Attribute.Text;
    mvp: Attribute.Relation<
      'api::mvp-steps-dev.mvp-steps-dev',
      'manyToOne',
      'api::mvp.mvp'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::mvp-steps-dev.mvp-steps-dev',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::mvp-steps-dev.mvp-steps-dev',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPortfolioPortfolio extends Schema.CollectionType {
  collectionName: 'portfolios';
  info: {
    singularName: 'portfolio';
    pluralName: 'portfolios';
    displayName: 'Portfolio';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    url: Attribute.String;
    title: Attribute.String;
    categories: Attribute.Text;
    img: Attribute.Text;
    image: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::portfolio.portfolio',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::portfolio.portfolio',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPremiumPipePremiumPipe extends Schema.CollectionType {
  collectionName: 'premium_pipes';
  info: {
    singularName: 'premium-pipe';
    pluralName: 'premium-pipes';
    displayName: 'Premium-pipe';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    premium_pipe_abouts: Attribute.Relation<
      'api::premium-pipe.premium-pipe',
      'oneToMany',
      'api::premium-pipe-about.premium-pipe-about'
    >;
    premium_pipe_concepts: Attribute.Relation<
      'api::premium-pipe.premium-pipe',
      'oneToMany',
      'api::premium-pipe-concept.premium-pipe-concept'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::premium-pipe.premium-pipe',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::premium-pipe.premium-pipe',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPremiumPipeAboutPremiumPipeAbout
  extends Schema.CollectionType {
  collectionName: 'premium_pipe_abouts';
  info: {
    singularName: 'premium-pipe-about';
    pluralName: 'premium-pipe-abouts';
    displayName: 'PremiumPipe-about';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    h2: Attribute.String;
    p: Attribute.Text;
    premium_pipe: Attribute.Relation<
      'api::premium-pipe-about.premium-pipe-about',
      'manyToOne',
      'api::premium-pipe.premium-pipe'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::premium-pipe-about.premium-pipe-about',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::premium-pipe-about.premium-pipe-about',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPremiumPipeConceptPremiumPipeConcept
  extends Schema.CollectionType {
  collectionName: 'premium_pipe_concepts';
  info: {
    singularName: 'premium-pipe-concept';
    pluralName: 'premium-pipe-concepts';
    displayName: 'PremiumPipe-concept';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    h2: Attribute.String;
    p: Attribute.Text;
    image: Attribute.Media;
    premium_pipe: Attribute.Relation<
      'api::premium-pipe-concept.premium-pipe-concept',
      'manyToOne',
      'api::premium-pipe.premium-pipe'
    >;
    img: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::premium-pipe-concept.premium-pipe-concept',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::premium-pipe-concept.premium-pipe-concept',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiServiceService extends Schema.CollectionType {
  collectionName: 'services';
  info: {
    singularName: 'service';
    pluralName: 'services';
    displayName: 'Service';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    heading: Attribute.String;
    service_types: Attribute.Relation<
      'api::service.service',
      'oneToMany',
      'api::service-type.service-type'
    >;
    subtitle: Attribute.Text;
    gridclass: Attribute.String;
    colorclass: Attribute.String;
    sectionicon: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiServiceTypeServiceType extends Schema.CollectionType {
  collectionName: 'service_types';
  info: {
    singularName: 'service-type';
    pluralName: 'service-types';
    displayName: 'Service-type';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    url: Attribute.String;
    service: Attribute.Relation<
      'api::service-type.service-type',
      'manyToOne',
      'api::service.service'
    >;
    title: Attribute.Text;
    description: Attribute.Text;
    price: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::service-type.service-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::service-type.service-type',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSwiperSwiper extends Schema.CollectionType {
  collectionName: 'swipers';
  info: {
    singularName: 'swiper';
    pluralName: 'swipers';
    displayName: 'Swiper';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    url: Attribute.String;
    title: Attribute.String;
    body: Attribute.Text;
    d: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::swiper.swiper',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::swiper.swiper',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::i18n.locale': PluginI18NLocale;
      'api::car1-body.car1-body': ApiCar1BodyCar1Body;
      'api::car1-switcher.car1-switcher': ApiCar1SwitcherCar1Switcher;
      'api::dev-arc-footer.dev-arc-footer': ApiDevArcFooterDevArcFooter;
      'api::dev-arc-header.dev-arc-header': ApiDevArcHeaderDevArcHeader;
      'api::dev-case.dev-case': ApiDevCaseDevCase;
      'api::dev-steps-dev.dev-steps-dev': ApiDevStepsDevDevStepsDev;
      'api::development.development': ApiDevelopmentDevelopment;
      'api::expertise-cart1.expertise-cart1': ApiExpertiseCart1ExpertiseCart1;
      'api::expertise-cart2.expertise-cart2': ApiExpertiseCart2ExpertiseCart2;
      'api::expertise-cart3.expertise-cart3': ApiExpertiseCart3ExpertiseCart3;
      'api::expertise-cart4.expertise-cart4': ApiExpertiseCart4ExpertiseCart4;
      'api::ii.ii': ApiIiIi;
      'api::ii-arc-footer.ii-arc-footer': ApiIiArcFooterIiArcFooter;
      'api::ii-arc-header.ii-arc-header': ApiIiArcHeaderIiArcHeader;
      'api::ii-steps-dev.ii-steps-dev': ApiIiStepsDevIiStepsDev;
      'api::mod-arc-footer.mod-arc-footer': ApiModArcFooterModArcFooter;
      'api::mod-arc-header.mod-arc-header': ApiModArcHeaderModArcHeader;
      'api::mod-steps-dev.mod-steps-dev': ApiModStepsDevModStepsDev;
      'api::modification.modification': ApiModificationModification;
      'api::mvp.mvp': ApiMvpMvp;
      'api::mvp-arc-footer.mvp-arc-footer': ApiMvpArcFooterMvpArcFooter;
      'api::mvp-arc-header.mvp-arc-header': ApiMvpArcHeaderMvpArcHeader;
      'api::mvp-steps-dev.mvp-steps-dev': ApiMvpStepsDevMvpStepsDev;
      'api::portfolio.portfolio': ApiPortfolioPortfolio;
      'api::premium-pipe.premium-pipe': ApiPremiumPipePremiumPipe;
      'api::premium-pipe-about.premium-pipe-about': ApiPremiumPipeAboutPremiumPipeAbout;
      'api::premium-pipe-concept.premium-pipe-concept': ApiPremiumPipeConceptPremiumPipeConcept;
      'api::service.service': ApiServiceService;
      'api::service-type.service-type': ApiServiceTypeServiceType;
      'api::swiper.swiper': ApiSwiperSwiper;
    }
  }
}
