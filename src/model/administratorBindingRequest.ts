/**
 * Stalker API
 * API di Stalker di Imola Informatica sviluppato da qbteam
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: qbteamswe@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * Request object for creating a new administrator account and binding it to the organization or just binding an already existent administrator.
 */
export interface AdministratorBindingRequest { 
    /**
     * Unique identifier of the organization the administrator is part of.
     */
    organizationId: number;
    /**
     * Administrator unique identifier from the authentication server of the organization.
     */
    orgAuthServerId?: string;
    /**
     * Administrator\'s e-mail address.
     */
    mail: string;
    /**
     * Administrator\'s new password.
     */
    password?: string;
    /**
     * What can or cannot do an organization\'s administrator. The permission levels are: - Owner: 3 (higher level) - Manager: 2 - Viewer: 1 (lowest level)
     */
    permission: number;
}

