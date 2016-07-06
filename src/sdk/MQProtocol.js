/**
 * Copyright 2016 PhenixP2P Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('sdk/MQProtocol', [
        'protobuf'
    ], function (ProtoBuf) {
    'use strict';

    var log = function () {
            console.log.apply(console, arguments);
        } || function () {
        };
    var logError = function () {
            console.error.apply(console, arguments);
        } || log;

    var mqProto = '{"package":"mq","messages":[{"name":"Request","fields":[{"rule":"optional","type":"string","name":"sessionId","id":1},{"rule":"optional","type":"string","name":"requestId","id":2},{"rule":"required","type":"string","name":"type","id":3},{"rule":"optional","type":"string","name":"encoding","id":4},{"rule":"required","type":"bytes","name":"payload","id":5}]},{"name":"Response","fields":[{"rule":"optional","type":"string","name":"sessionId","id":1},{"rule":"required","type":"string","name":"requestId","id":2},{"rule":"required","type":"string","name":"type","id":3},{"rule":"optional","type":"string","name":"encoding","id":4},{"rule":"required","type":"bytes","name":"payload","id":5},{"rule":"repeated","type":"double","name":"wallTime","id":6}]},{"name":"Error","fields":[{"rule":"required","type":"string","name":"reason","id":1}]},{"name":"PingPong","fields":[{"rule":"required","type":"uint64","name":"originTimestamp","id":1},{"rule":"optional","type":"uint64","name":"count","id":2}]}]}';
    var pcastProto = '{"package":"pcast","messages":[{"name":"Authenticate","fields":[{"rule":"optional","type":"uint32","name":"apiVersion","id":9,"options":{"default":0}},{"rule":"required","type":"string","name":"clientVersion","id":1},{"rule":"optional","type":"string","name":"device","id":12},{"rule":"required","type":"string","name":"deviceId","id":2},{"rule":"optional","type":"string","name":"manufacturer","id":13},{"rule":"required","type":"string","name":"platform","id":3},{"rule":"required","type":"string","name":"platformVersion","id":4},{"rule":"required","type":"string","name":"authenticationToken","id":5},{"rule":"optional","type":"string","name":"connectionId","id":6},{"rule":"optional","type":"string","name":"connectionRouteKey","id":10},{"rule":"optional","type":"string","name":"remoteAddress","id":11},{"rule":"optional","type":"string","name":"sessionId","id":7},{"rule":"optional","type":"string","name":"applicationId","id":8}]},{"name":"AuthenticateResponse","fields":[{"rule":"required","type":"string","name":"status","id":1},{"rule":"optional","type":"string","name":"sessionId","id":2},{"rule":"optional","type":"string","name":"redirect","id":3}]},{"name":"Bye","fields":[{"rule":"required","type":"string","name":"sessionId","id":1},{"rule":"required","type":"string","name":"reason","id":2}]},{"name":"ByeResponse","fields":[{"rule":"required","type":"string","name":"status","id":1}]},{"name":"SessionDescription","fields":[{"rule":"required","type":"Type","name":"type","id":1,"options":{"default":"Offer"}},{"rule":"required","type":"string","name":"sdp","id":2}],"enums":[{"name":"Type","values":[{"name":"Offer","id":0},{"name":"Answer","id":1}]}]},{"name":"CreateStream","fields":[{"rule":"required","type":"string","name":"sessionId","id":1},{"rule":"optional","type":"string","name":"originStreamId","id":2},{"rule":"repeated","type":"string","name":"options","id":3},{"rule":"repeated","type":"string","name":"tags","id":4},{"rule":"optional","type":"SetRemoteDescription","name":"setRemoteDescription","id":5},{"rule":"optional","type":"CreateOfferDescription","name":"createOfferDescription","id":6},{"rule":"optional","type":"CreateAnswerDescription","name":"createAnswerDescription","id":7}]},{"name":"CreateStreamResponse","fields":[{"rule":"required","type":"string","name":"status","id":1},{"rule":"optional","type":"string","name":"streamId","id":2},{"rule":"optional","type":"string","name":"instanceRouteKey","id":5},{"rule":"optional","type":"SetRemoteDescriptionResponse","name":"setRemoteDescriptionResponse","id":3},{"rule":"optional","type":"CreateOfferDescriptionResponse","name":"createOfferDescriptionResponse","id":4},{"rule":"optional","type":"CreateAnswerDescriptionResponse","name":"createAnswerDescriptionResponse","id":6}]},{"name":"SetLocalDescription","fields":[{"rule":"required","type":"string","name":"streamId","id":1},{"rule":"required","type":"SessionDescription","name":"sessionDescription","id":2},{"rule":"optional","type":"uint32","name":"apiVersion","id":3,"options":{"default":0}}]},{"name":"SetLocalDescriptionResponse","fields":[{"rule":"required","type":"string","name":"status","id":1}]},{"name":"SetRemoteDescription","fields":[{"rule":"required","type":"string","name":"streamId","id":1},{"rule":"required","type":"SessionDescription","name":"sessionDescription","id":2},{"rule":"optional","type":"uint32","name":"apiVersion","id":3,"options":{"default":0}}]},{"name":"SetRemoteDescriptionResponse","fields":[{"rule":"required","type":"string","name":"status","id":1},{"rule":"optional","type":"SessionDescription","name":"sessionDescription","id":2}]},{"name":"CreateOfferDescription","fields":[{"rule":"required","type":"string","name":"streamId","id":1},{"rule":"repeated","type":"string","name":"options","id":2},{"rule":"optional","type":"uint32","name":"apiVersion","id":3,"options":{"default":0}}]},{"name":"CreateOfferDescriptionResponse","fields":[{"rule":"required","type":"string","name":"status","id":1},{"rule":"optional","type":"SessionDescription","name":"sessionDescription","id":2}]},{"name":"CreateAnswerDescription","fields":[{"rule":"required","type":"string","name":"streamId","id":1},{"rule":"repeated","type":"string","name":"options","id":2},{"rule":"optional","type":"uint32","name":"apiVersion","id":3,"options":{"default":0}}]},{"name":"CreateAnswerDescriptionResponse","fields":[{"rule":"required","type":"string","name":"status","id":1},{"rule":"optional","type":"SessionDescription","name":"sessionDescription","id":2}]},{"name":"UpdateStreamState","fields":[{"rule":"required","type":"string","name":"streamId","id":1},{"rule":"required","type":"string","name":"signalingState","id":2},{"rule":"required","type":"string","name":"iceGatheringState","id":3},{"rule":"required","type":"string","name":"iceConnectionState","id":4}]},{"name":"DestroyStream","fields":[{"rule":"required","type":"string","name":"streamId","id":1},{"rule":"optional","type":"string","name":"reason","id":2}]},{"name":"DestroyStreamResponse","fields":[{"rule":"required","type":"string","name":"status","id":1}]},{"name":"StreamStarted","fields":[{"rule":"required","type":"string","name":"sessionId","id":1},{"rule":"required","type":"string","name":"streamId","id":2},{"rule":"repeated","type":"string","name":"tags","id":3}]},{"name":"StreamEnded","fields":[{"rule":"required","type":"string","name":"sessionId","id":1},{"rule":"required","type":"string","name":"streamId","id":2},{"rule":"required","type":"string","name":"reason","id":3}]},{"name":"StreamEndedResponse","fields":[{"rule":"required","type":"string","name":"status","id":1}]},{"name":"StreamArchived","fields":[{"rule":"required","type":"string","name":"sessionId","id":1},{"rule":"required","type":"string","name":"streamId","id":2},{"rule":"required","type":"string","name":"uri","id":3}]},{"name":"SessionEnded","fields":[{"rule":"required","type":"string","name":"sessionId","id":1},{"rule":"required","type":"string","name":"reason","id":2},{"rule":"required","type":"float","name":"duration","id":3}]},{"name":"IssueAuthenticationToken","fields":[{"rule":"required","type":"string","name":"applicationId","id":1},{"rule":"required","type":"string","name":"secret","id":2},{"rule":"repeated","type":"string","name":"capabilities","id":3}]},{"name":"IssueAuthenticationTokenResponse","fields":[{"rule":"required","type":"string","name":"status","id":1},{"rule":"optional","type":"string","name":"authenticationToken","id":2}]},{"name":"IssueStreamToken","fields":[{"rule":"required","type":"string","name":"applicationId","id":1},{"rule":"required","type":"string","name":"secret","id":2},{"rule":"required","type":"string","name":"sessionId","id":3},{"rule":"optional","type":"string","name":"originStreamId","id":4},{"rule":"repeated","type":"string","name":"capabilities","id":5}]},{"name":"IssueStreamTokenResponse","fields":[{"rule":"required","type":"string","name":"status","id":1},{"rule":"optional","type":"string","name":"streamToken","id":2}]},{"name":"Stream","fields":[{"rule":"required","type":"string","name":"streamId","id":1}]},{"name":"ListStreams","fields":[{"rule":"required","type":"string","name":"applicationId","id":1},{"rule":"required","type":"string","name":"secret","id":2},{"rule":"optional","type":"string","name":"start","id":3},{"rule":"required","type":"uint32","name":"length","id":4}]},{"name":"ListStreamsResponse","fields":[{"rule":"required","type":"string","name":"status","id":1},{"rule":"optional","type":"string","name":"start","id":2},{"rule":"optional","type":"uint32","name":"length","id":3},{"rule":"repeated","type":"Stream","name":"streams","id":4}]},{"name":"TerminateStream","fields":[{"rule":"required","type":"string","name":"applicationId","id":1},{"rule":"required","type":"string","name":"secret","id":2},{"rule":"required","type":"string","name":"streamId","id":3},{"rule":"optional","type":"string","name":"reason","id":4}]},{"name":"TerminateStreamResponse","fields":[{"rule":"required","type":"string","name":"status","id":1}]},{"name":"SetupStream","fields":[{"rule":"required","type":"string","name":"streamToken","id":1},{"rule":"required","type":"CreateStream","name":"createStream","id":2}]},{"name":"SetupStreamResponse","fields":[{"rule":"required","type":"string","name":"status","id":1},{"rule":"optional","type":"CreateStreamResponse","name":"createStreamResponse","id":2}]},{"name":"EndStream","fields":[{"rule":"required","type":"string","name":"streamId","id":1},{"rule":"optional","type":"string","name":"reason","id":2,"options":{"default":"ended"}}]},{"name":"EndStreamResponse","fields":[{"rule":"required","type":"string","name":"status","id":1}]},{"name":"StreamDataQuality","fields":[{"rule":"required","type":"string","name":"sessionId","id":1},{"rule":"required","type":"string","name":"streamId","id":2},{"rule":"required","type":"uint64","name":"timestamp","id":3},{"rule":"required","type":"DataQualityStatus","name":"status","id":4},{"rule":"required","type":"DataQualityReason","name":"reason","id":5}],"enums":[{"name":"DataQualityStatus","values":[{"name":"NoData","id":0},{"name":"AudioOnly","id":1},{"name":"All","id":2}]},{"name":"DataQualityReason","values":[{"name":"None","id":0},{"name":"UploadLimited","id":1},{"name":"DownloadLimited","id":2},{"name":"PublisherLimited","id":3},{"name":"NetworkLimited","id":4}]}]},{"name":"StreamDataQualityResponse","fields":[{"rule":"required","type":"string","name":"status","id":1}]}]}';

    function MQProtocol() {
        var builder = ProtoBuf.loadJson(mqProto);

        builder = ProtoBuf.loadJson(pcastProto, builder);

        this._builders = builder.build();
        this._apiVersion = 1;
    }

    MQProtocol.prototype.getApiVersion = function () {
        return this._apiVersion;
    };

    MQProtocol.prototype.encode = function (type, data) {
        if (typeof type !== 'string') {
            throw new Error("'type' must be a string");
        }
        if (typeof data !== 'object') {
            throw new Error("'data' must be an object");
        }

        var builder = getBuilder.call(this, type);

        return builder.encode(data);
    };

    MQProtocol.prototype.decode = function (type, value) {
        if (typeof type !== 'string') {
            throw new Error("'type' must be a string");
        }

        var builder = getBuilder.call(this, type);

        return stringifyEnums(builder.decode(value));
    };

    function getBuilder(type) {
        var fragments = type.split('.');
        var builder = this._builders;

        for (var i = 0; i < fragments.length - 1; i++) {
            builder = builder[fragments[i]];

            if (!builder) {
                throw new Error('Unsupported type "' + type + '"');
            }
        }

        builder = builder[fragments[fragments.length - 1]];

        if (typeof builder !== 'function') {
            throw new Error('Unsupported type "' + type + '"');
        }

        return builder;
    }

    function stringifyEnums(message) {
        if (message && message.$type && message.$type.children) {
            for (var key in message.$type.children) {
                var child = message.$type.children[key];
                var value = message[child.name];
                var type = child && child.element ? child.element.resolvedType : null;

                if (type && type.className === 'Message' && type.children) {
                    message[child.name] = stringifyEnums(value);
                } else if (type && type.className === 'Enum' && type.children) {
                    var metaValue = null;

                    for (var i = 0; i < type.children.length; i++) {
                        if (type.children[i].id === value) {
                            metaValue = type.children[i];
                            break;
                        }
                    }

                    if (metaValue && metaValue.name) {
                        message[child.name] = metaValue.name;
                    }
                }
            }
        }

        return message;
    }

    return MQProtocol;
});
