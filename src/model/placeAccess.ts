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
 * Access to a place of an organization.
 */
export interface PlaceAccess { 
    id: number;
    /**
     * Date and time of the moment in which the user entered the place.
     */
    entranceTimestamp: Date;
    /**
     * Date and time of the moment in which the user left the place.
     */
    exitTimestamp?: Date;
    /**
     * Token generated by the server required for registering the user exit movement.
     */
    exitToken: string;
    /**
     * Unique identifier of the place in which the user had access.
     */
    placeId: number;
    /**
     * User unique identifier from the authentication server of the organization.
     */
    orgAuthServerId?: string;
}

