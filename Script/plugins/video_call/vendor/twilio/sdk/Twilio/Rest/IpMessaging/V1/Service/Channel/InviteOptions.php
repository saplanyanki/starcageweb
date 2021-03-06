<?php

/**
 * This code was generated by
 * \ / _    _  _|   _  _
 * | (_)\/(_)(_|\/| |(/_  v1.0.0
 * /       /
 */

namespace Twilio\Rest\IpMessaging\V1\Service\Channel;

use Twilio\Options;
use Twilio\Values;

abstract class InviteOptions {
    /**
     * @param string $roleSid The Role assigned to this member.
     * @return CreateInviteOptions Options builder
     */
    public static function create($roleSid = Values::NONE) {
        return new CreateInviteOptions($roleSid);
    }

    /**
     * @param string $identity A unique string identifier for this User in this
     *                         Service.
     * @return ReadInviteOptions Options builder
     */
    public static function read($identity = Values::NONE) {
        return new ReadInviteOptions($identity);
    }
}

class CreateInviteOptions extends Options {
    /**
     * @param string $roleSid The Role assigned to this member.
     */
    public function __construct($roleSid = Values::NONE) {
        $this->options['roleSid'] = $roleSid;
    }

    /**
     * The [Role](https://www.twilio.com/docs/api/chat/rest/v1/role) assigned to this member.
     * 
     * @param string $roleSid The Role assigned to this member.
     * @return $this Fluent Builder
     */
    public function setRoleSid($roleSid) {
        $this->options['roleSid'] = $roleSid;
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
        return '[Twilio.IpMessaging.V1.CreateInviteOptions ' . implode(' ', $options) . ']';
    }
}

class ReadInviteOptions extends Options {
    /**
     * @param string $identity A unique string identifier for this User in this
     *                         Service.
     */
    public function __construct($identity = Values::NONE) {
        $this->options['identity'] = $identity;
    }

    /**
     * A unique string identifier for this [User](https://www.twilio.com/docs/api/chat/rest/v1/user) in this [Service](https://www.twilio.com/docs/api/chat/rest/v1/service). See the [access tokens](https://www.twilio.com/docs/api/chat/guides/create-tokens)[/docs/api/chat/guides/create-tokens] docs for more details.
     * 
     * @param string $identity A unique string identifier for this User in this
     *                         Service.
     * @return $this Fluent Builder
     */
    public function setIdentity($identity) {
        $this->options['identity'] = $identity;
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
        return '[Twilio.IpMessaging.V1.ReadInviteOptions ' . implode(' ', $options) . ']';
    }
}