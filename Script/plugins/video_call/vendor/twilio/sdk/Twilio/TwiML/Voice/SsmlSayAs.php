<?php

/**
 * This code was generated by
 * \ / _    _  _|   _  _
 * | (_)\/(_)(_|\/| |(/_  v1.0.0
 * /       /
 */

namespace Twilio\TwiML\Voice;

use Twilio\TwiML\TwiML;

class SsmlSayAs extends TwiML {
    /**
     * SsmlSayAs constructor.
     * 
     * @param string $words Words to be interpreted
     * @param array $attributes Optional attributes
     */
    public function __construct($words, $attributes = array()) {
        parent::__construct('say-as', $words, $attributes);
    }

    /**
     * Add Interpret-As attribute.
     * 
     * @param ssmlSayAs:Enum:InterpretAs $interpret-As Specify the type of words
     *                                                 are spoken
     * @return TwiML $this.
     */
    public function setInterpretAs($interpretAs) {
        return $this->setAttribute('interpret-as', $interpretAs);
    }

    /**
     * Add Role attribute.
     * 
     * @param ssmlSayAs:Enum:Role $role Specify the format of the date when
     *                                  interpret-as is set to date
     * @return TwiML $this.
     */
    public function setRole($role) {
        return $this->setAttribute('role', $role);
    }
}