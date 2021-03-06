<?php

/**
 * This code was generated by
 * \ / _    _  _|   _  _
 * | (_)\/(_)(_|\/| |(/_  v1.0.0
 * /       /
 */

namespace Twilio\Rest\Sync\V1;

use Twilio\Options;
use Twilio\Values;

/**
 * PLEASE NOTE that this class contains beta products that are subject to change. Use them with caution.
 */
abstract class ServiceOptions {
    /**
     * @param string $friendlyName Human-readable name for this service instance
     * @param string $webhookUrl A URL that will receive event updates when objects
     *                           are manipulated.
     * @param boolean $reachabilityWebhooksEnabled true or false - controls whether
     *                                             this instance fires webhooks
     *                                             when client endpoints connect to
     *                                             Sync
     * @param boolean $aclEnabled true or false - determines whether token
     *                            identities must be granted access to Sync objects
     *                            via the Permissions API in this Service.
     * @return CreateServiceOptions Options builder
     */
    public static function create($friendlyName = Values::NONE, $webhookUrl = Values::NONE, $reachabilityWebhooksEnabled = Values::NONE, $aclEnabled = Values::NONE) {
        return new CreateServiceOptions($friendlyName, $webhookUrl, $reachabilityWebhooksEnabled, $aclEnabled);
    }

    /**
     * @param string $webhookUrl A URL that will receive event updates when objects
     *                           are manipulated.
     * @param string $friendlyName Human-readable name for this service instance
     * @param boolean $reachabilityWebhooksEnabled True or false - controls whether
     *                                             this instance fires webhooks
     *                                             when client endpoints connect to
     *                                             Sync
     * @param boolean $aclEnabled true or false - determines whether token
     *                            identities must be granted access to Sync objects
     *                            via the Permissions API in this Service.
     * @return UpdateServiceOptions Options builder
     */
    public static function update($webhookUrl = Values::NONE, $friendlyName = Values::NONE, $reachabilityWebhooksEnabled = Values::NONE, $aclEnabled = Values::NONE) {
        return new UpdateServiceOptions($webhookUrl, $friendlyName, $reachabilityWebhooksEnabled, $aclEnabled);
    }
}

class CreateServiceOptions extends Options {
    /**
     * @param string $friendlyName Human-readable name for this service instance
     * @param string $webhookUrl A URL that will receive event updates when objects
     *                           are manipulated.
     * @param boolean $reachabilityWebhooksEnabled true or false - controls whether
     *                                             this instance fires webhooks
     *                                             when client endpoints connect to
     *                                             Sync
     * @param boolean $aclEnabled true or false - determines whether token
     *                            identities must be granted access to Sync objects
     *                            via the Permissions API in this Service.
     */
    public function __construct($friendlyName = Values::NONE, $webhookUrl = Values::NONE, $reachabilityWebhooksEnabled = Values::NONE, $aclEnabled = Values::NONE) {
        $this->options['friendlyName'] = $friendlyName;
        $this->options['webhookUrl'] = $webhookUrl;
        $this->options['reachabilityWebhooksEnabled'] = $reachabilityWebhooksEnabled;
        $this->options['aclEnabled'] = $aclEnabled;
    }

    /**
     * Human-readable name for this service instance
     * 
     * @param string $friendlyName Human-readable name for this service instance
     * @return $this Fluent Builder
     */
    public function setFriendlyName($friendlyName) {
        $this->options['friendlyName'] = $friendlyName;
        return $this;
    }

    /**
     * A URL that will receive event updates when objects are manipulated.
     * 
     * @param string $webhookUrl A URL that will receive event updates when objects
     *                           are manipulated.
     * @return $this Fluent Builder
     */
    public function setWebhookUrl($webhookUrl) {
        $this->options['webhookUrl'] = $webhookUrl;
        return $this;
    }

    /**
     * `true` or `false` - controls whether this instance fires webhooks when client endpoints connect to Sync Defaults to false.
     * 
     * @param boolean $reachabilityWebhooksEnabled true or false - controls whether
     *                                             this instance fires webhooks
     *                                             when client endpoints connect to
     *                                             Sync
     * @return $this Fluent Builder
     */
    public function setReachabilityWebhooksEnabled($reachabilityWebhooksEnabled) {
        $this->options['reachabilityWebhooksEnabled'] = $reachabilityWebhooksEnabled;
        return $this;
    }

    /**
     * `true` or `false` - determines whether token identities must be granted access to Sync objects via the [Permissions API](https://www.twilio.com/docs/api/sync/rest/sync-rest-api-permissions) in this Service.
     * 
     * @param boolean $aclEnabled true or false - determines whether token
     *                            identities must be granted access to Sync objects
     *                            via the Permissions API in this Service.
     * @return $this Fluent Builder
     */
    public function setAclEnabled($aclEnabled) {
        $this->options['aclEnabled'] = $aclEnabled;
        return $this;
    }

    /**
     * Provide a friendly representation
     * 
     * @return string Machine friendly representation
     */
    public function __toString() {
        $options = array();
        foreach ($this->options as $key => $value) {
            if ($value != Values::NONE) {
                $options[] = "$key=$value";
            }
        }
        return '[Twilio.Sync.V1.CreateServiceOptions ' . implode(' ', $options) . ']';
    }
}

class UpdateServiceOptions extends Options {
    /**
     * @param string $webhookUrl A URL that will receive event updates when objects
     *                           are manipulated.
     * @param string $friendlyName Human-readable name for this service instance
     * @param boolean $reachabilityWebhooksEnabled True or false - controls whether
     *                                             this instance fires webhooks
     *                                             when client endpoints connect to
     *                                             Sync
     * @param boolean $aclEnabled true or false - determines whether token
     *                            identities must be granted access to Sync objects
     *                            via the Permissions API in this Service.
     */
    public function __construct($webhookUrl = Values::NONE, $friendlyName = Values::NONE, $reachabilityWebhooksEnabled = Values::NONE, $aclEnabled = Values::NONE) {
        $this->options['webhookUrl'] = $webhookUrl;
        $this->options['friendlyName'] = $friendlyName;
        $this->options['reachabilityWebhooksEnabled'] = $reachabilityWebhooksEnabled;
        $this->options['aclEnabled'] = $aclEnabled;
    }

    /**
     * A URL that will receive event updates when objects are manipulated.
     * 
     * @param string $webhookUrl A URL that will receive event updates when objects
     *                           are manipulated.
     * @return $this Fluent Builder
     */
    public function setWebhookUrl($webhookUrl) {
        $this->options['webhookUrl'] = $webhookUrl;
        return $this;
    }

    /**
     * Human-readable name for this service instance
     * 
     * @param string $friendlyName Human-readable name for this service instance
     * @return $this Fluent Builder
     */
    public function setFriendlyName($friendlyName) {
        $this->options['friendlyName'] = $friendlyName;
        return $this;
    }

    /**
     * True or false - controls whether this instance fires webhooks when client endpoints connect to Sync Defaults to false.
     * 
     * @param boolean $reachabilityWebhooksEnabled True or false - controls whether
     *                                             this instance fires webhooks
     *                                             when client endpoints connect to
     *                                             Sync
     * @return $this Fluent Builder
     */
    public function setReachabilityWebhooksEnabled($reachabilityWebhooksEnabled) {
        $this->options['reachabilityWebhooksEnabled'] = $reachabilityWebhooksEnabled;
        return $this;
    }

    /**
     * `true` or `false` - determines whether token identities must be granted access to Sync objects via the [Permissions API](https://www.twilio.com/docs/api/sync/rest/sync-rest-api-permissions) in this Service.
     * 
     * @param boolean $aclEnabled true or false - determines whether token
     *                            identities must be granted access to Sync objects
     *                            via the Permissions API in this Service.
     * @return $this Fluent Builder
     */
    public function setAclEnabled($aclEnabled) {
        $this->options['aclEnabled'] = $aclEnabled;
        return $this;
    }

    /**
     * Provide a friendly representation
     * 
     * @return string Machine friendly representation
     */
    public function __toString() {
        $options = array();
        foreach ($this->options as $key => $value) {
            if ($value != Values::NONE) {
                $options[] = "$key=$value";
            }
        }
        return '[Twilio.Sync.V1.UpdateServiceOptions ' . implode(' ', $options) . ']';
    }
}