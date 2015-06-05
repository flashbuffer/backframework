define("contacts/memberPickerView", ["modules/backbone.js", "modules/underscore.js", "3rd/template.js", "contacts/tagModel.js", "lib/eventManager.js", "contacts/tagCollection.js", "contacts/partyCollection.js", "contacts/partyModel.js", "contacts/memberCollection.js", "contacts/memberModel.js", "contacts/partyView.js", "contacts/contactManager.js", "contacts/tpl/partyViewTagRow.html.js", "contacts/tpl/partyViewIconLabel.html.js", "contacts/tpl/partyViewDefault.html.js", "contacts/partyListView.js", "lib/Tips.js", "contacts/tpl/partyCreateView.html.js", "contacts/tpl/partyUpdateView.html.js", "contacts/memberView.js", "contacts/operlogListView.js", "contacts/tpl/memberViewDefault.html.js", "contacts/tpl/memberViewRow.html.js", "contacts/tpl/memberViewAvatarLabel.html.js", "contacts/tpl/memberViewOperlog.html.js", "contacts/tpl/memberViewTagRow.html.js", "contacts/memberEditorView.js", "lib/basetool.js", "lib/upload/upload.js", "config/jqueryValidateConfig.js", "3rd/jquery.serializeJSON.js", "contacts/tpl/memberEditorView.html.js", "contacts/memberHandlerView.js", "config/ajaxProxy.js", "lib/menu.js", "lib/MNDialog.js", "contacts/tpl/memberInvite.html.js", "contacts/operlogModel.js", "contacts/operlogCollection.js", "app/data/agentCollection.js", "lib/selectTree.js", "contacts/contactInputView.js", "contacts/tagListView.js", "contacts/listview/listview.js", "contacts/tpl/contactInputView.html.js", "contacts/tpl/contactInputResults.html.js", "lib/dragLayer/dragLayer.js", "lib/MNDialogTpl.html.js", "./tpl/memberPickerView.html.js"], function (a, b, c) {
    var d = a("modules/backbone"), e = a("modules/underscore"), f = a("3rd/template.js"), g = (a("contacts/tagModel.js"), a("contacts/tagCollection.js"), a("contacts/partyCollection.js")), h = a("contacts/memberCollection.js"), i = a("contacts/partyView.js"), j = a("contacts/partyListView.js"), k = a("contacts/memberView.js"), l = a("contacts/memberEditorView.js"), m = a("contacts/memberHandlerView.js"), n = a("contacts/contactManager.js"), o = a("contacts/contactInputView.js"), p = a("lib/eventManager.js"), q = a("lib/Tips"), r = a("lib/menu.js");
    a("lib/MNDialog.js");
    var s = {tag: 0, party: 1}, t = d.View.extend({tagName: "div", className: "opp_result", events: {"click .js_back": "onBack", "click .js_close": "onClose", "click .js_move": "onMoveMember", "click .js_update": "onUpdateMember", "click .js_enable": "onToggleMember", "click .js_review": "onReviewOperlog", "click .js_delete": "onDeleteMember", "click .js_invite": "onInviteMember", "click .js_setTop": "onSetMemberTop", "click .js_tag_delete": "onDeleteTagMember", "click .js_menu": "showMenu", "click .js_deselect": "onRemoveSelected"}, options: {multiple: !1}, initialize: function () {
        return this.tpl = f.compile(a("./tpl/memberPickerView.html")), this.parties = new g, this.members = new h, this.memberHandlerView = new m, this
    }, remove: function () {
        return this.$el.remove(), this.stopListening(), this
    }, listenEvents: function () {
        return this.stopListening(), this.delegateEvents(), this.listenTo(this.parties, "add", this.onAddParty), this.listenTo(this.parties, "remove", this.onRemoveParty), this.listenTo(this.parties, "reset", this.onResetParties), this.listenTo(this.members, "add", this.onAddMember), this.listenTo(this.members, "remove", this.onRemoveMember), this.listenTo(this.members, "reset", this.onResetMembers), this
    }, render: function (a) {
        this.options = $.extend(this.options, a), this.menu && (this.menu.remove(), this.menu = null);
        var b = this.multiple != this.options.multiple;
        return this.multiple = this.options.multiple, this.$el.html(this.tpl(this.options)), this.$list = this.$("ul.js_member_list"), b ? this.reset() : (this.onResetParties(this.parties), this.onResetMembers(this.members), this.renderToolBar()), this.options.operlog = !1, this.listenEvents(), this
    }, add: function (a) {
        return n.isParty(a) ? this.parties.add(a) : n.isMember(a) && this.members.add(a), this
    }, remove: function (a) {
        return n.isParty(a) ? this.parties.remove(a) : n.isMember(a) && this.members.remove(a), this
    }, reset: function (a) {
        return this.trigger("reset"), a ? (this.parties.reset(a.parties), this.members.reset(a.members)) : (this.parties.reset(), this.members.reset()), this
    }, isSelected: function (a) {
        return n.isParty(a) ? this.parties.get(a) : n.isMember(a) ? this.members.get(a) : void 0
    }, length: function () {
        return this.parties.length + this.members.length
    }, renderToolBar: function () {
        var a = e.find(this.members.models, function (a) {
            return n.isEditable(a)
        }), b = e.find(this.members.models, function (a) {
            return"MMOCBIZ_CONTACT_FROZEN" == a.get("JoinStatus")
        }), c = e.find(this.members.models, function (a) {
            return"MMOCBIZ_CONTACT_PENDING" == a.get("JoinStatus")
        });
        this.$toolbar = this.$(".js_member_toolbar"), this.multiple ? (a ? (this.$(".js_move").removeClass("disabled"), this.$(".js_delete").removeClass("disabled"), this.$(".js_invite").removeClass("disabled"), this.$(".js_tag_toggle").removeClass("disabled"), this.$(".js_setTop").removeClass("disabled"), c || this.$(".js_invite").addClass("disabled")) : (this.$(".js_move").addClass("disabled"), this.$(".js_delete").addClass("disabled"), this.$(".js_invite").addClass("disabled"), this.$(".js_tag_toggle").addClass("disabled"), this.$(".js_setTop").addClass("disabled")), this.$(".js_member_count").html(this.length())) : (a ? (this.$(".js_invite").removeClass("disabled"), this.$(".js_update").removeClass("disabled"), this.$(".js_enable").removeClass("disabled"), this.$(".js_invite").removeClass("disabled"), this.$(".js_tag_toggle").removeClass("disabled"), this.$(".js_setTop").removeClass("disabled"), this.$(".js_menu").removeClass("disabled"), c || this.$(".js_invite").addClass("disabled")) : (this.$(".js_invite").addClass("disabled"), this.$(".js_update").addClass("disabled"), this.$(".js_enable").addClass("disabled"), this.$(".js_invite").addClass("disabled"), this.$(".js_tag_toggle").addClass("disabled"), this.$(".js_menu").addClass("disabled"), this.$(".js_setTop").addClass("disabled")), this.$(".js_enable").html(b && "鍚敤" || "绂佺敤"))
    }, show: function () {
        return this.$el.is(":visible") || this.$el.show().animate({right: 0}, "fast"), this
    }, hide: function () {
        return this.$el.is(":visible") && this.$el.hide().animate({right: -370}, "fast"), this
    }, setTitle: function (a) {
        this.$(".choosed_mainTitle").text(a)
    }, onAddParty: function (a) {
        var b = this.$list.find('li[data-type="party"]'), c = this.$list.find('li[data-type="member"]'), d = i, e = d.style.card;
        this.multiple ? e = d.style.iconLabel : this.setTitle("閮ㄩ棬璧勬枡");
        var f = new d({model: a, style: e});
        b.length ? f.render().$el.insertAfter(b.last()) : c.length ? f.render().$el.insertBefore(c.first()) : f.render().$el.appendTo(this.$list), this.show(), this.renderToolBar(), this.trigger("add", a)
    }, onRemoveParty: function (a) {
        this.$list.find('li[data-type="party"]').filter('li[data-id="' + a.id + '"]').remove(), this.length() || this.hide(), this.renderToolBar(), $("#memberPopover").remove(), this.trigger("remove", a)
    }, onResetParties: function (a) {
        var b = this;
        this.$list.find('li[data-type="party"]').remove(), a.length ? a.each(function (c) {
            b.onAddParty(c, a)
        }) : this.length() || this.hide()
    }, onAddMember: function (a) {
        var b = this, c = 50;
        if (this.$list.find('li[data-type="member"]').length < c) {
            var d = k, e = d.style.card;
            this.multiple ? e = d.style.avatarLabel : this.options.operlog ? e = d.style.operlog : this.setTitle("鎴愬憳璧勬枡");
            var f = new d({model: a, style: e});
            f.render().$el.appendTo(this.$list), this.multiple && f.$el.hover(function (a) {
                f.$el.data("hover", !0), setTimeout(function () {
                    f.$el.data("hover") && !$("#memberPopover").length && b.showMemberPopover(a, f)
                }, 1e3)
            }, function (a) {
                f.$el.data("hover", !1), setTimeout(function () {
                    f.$el.data("hover") || b.hideMemberPopover(a)
                }, 10)
            })
        }
        this.show(), this.renderToolBar(), this.trigger("add", a)
    }, onRemoveMember: function (a) {
        this.$list.find('li[data-type="member"]').filter('li[data-id="' + a.id + '"]').remove(), this.length() || this.hide(), this.renderToolBar(), $("#memberPopover").remove(), this.trigger("remove", a)
    }, onResetMembers: function (a) {
        var b = this;
        this.$list.find('li[data-type="member"]').remove(), a.length ? a.each(function (c) {
            b.onAddMember(c, a)
        }) : this.length() || this.hide()
    }, onRemoveSelected: function (a) {
        a.stopPropagation();
        var b, c = $(a.target).closest("li");
        b = "party" == c.attr("data-type") ? this.parties.get(c.attr("data-id")) : this.members.get(c.attr("data-id")), this.remove(b)
    }, onBack: function () {
        this.render({operlog: !1})
    }, onClose: function () {
        this.reset()
    }, onUpdateMember: function () {
        var a = this.members.first();
        n.isEditable(a) && (this.memberEditorView = new l({model: a}), this.memberEditorView.render())
    }, onToggleMember: function () {
        var a = this, b = this.members.first();
        if ("MMOCBIZ_CONTACT_FROZEN" != b.get("JoinStatus"))var c = $("<div>").MNDialog({sId: "MNDialog", sClass: "dialog_box", nTop: 20, nContentHeight: 100, oContentHtml: function (a) {
            var c = f.compile(['<div class="dialog_tip warning">', '<div class="tip_text">', '<div class="tip_text_title">{{if contactrole}}<span class="group_item_name">{{username}}</span>鏄郴缁熺鐞嗗憳锛屼綘纭畾瑕佺鐢ㄥ悧锛焮{else}}浣犵‘瀹氳绂佺敤<span class="group_item_name">{{username}}</span>鍚楋紵{{/if}}</div>', "</div>", "</div>"].join(""));
            a(c(b.toJSON()))
        }, oFooterHtml: '<a class="btn" D_ck="cancel">鍙栨秷</a><a class="btn btn_blue" D_ck="submit">纭畾</a>', sTitle: "绂佺敤鎴愬憳", oRules: {click: {cancel: function () {
            c.close()
        }, submit: function () {
            c.close(), n.toggleMember(b, {success: function (b) {
                q.suc("MMOCBIZ_CONTACT_FROZEN" == b.get("JoinStatus") && "绂佺敤鎴愬姛" || "鍚敤鎴愬姛"), a.reset({members: [b]})
            }})
        }}}}); else n.toggleMember(b, {success: function (b) {
            q.suc("MMOCBIZ_CONTACT_FROZEN" == b.get("JoinStatus") && "绂佺敤鎴愬姛" || "鍚敤鎴愬姛"), a.reset({members: [b]})
        }})
    }, onDeleteMember: function () {
        var a = this, b = new h, c = new h;
        this.members.each(function (a) {
            n.isEditable(a) && b.add(a) || c.add(a)
        });
        var d = $("<div>").MNDialog({sId: "MNDialog", sClass: "dialog_box", nTop: 20, nContentHeight: 100, oContentHtml: function (b) {
            var d = f.compile(['<div class="dialog_tip warning">', '<span class="tip_icon"></span>', '<div class="tip_text">', '<div class="tip_text_title">浣犵‘瀹氳鍒犻櫎鎵€閫夌殑{{total}}浣嶆垚鍛樺悧锛�<br/>浣犱笉鑳芥挙閿€姝ゆ搷浣溿€�</div>', "{{if invalid > 0}}", '<div class="tip_text_detail">', '{{each members as member i}}{{if i <= 5}}<div class="group_item"><span class="group_item_name">{{member.username}}</span></div>{{/if}}{{/each}}', "</div>", "{{if invalid > 5}}绛墈{invalid}}浜簕{/if}}涓嶅湪绠＄悊鑼冨洿鍐咃紝涓嶄細琚垹闄�", "{{/if}}", "</div>", "</div>"].join(""));
            b(d({total: a.members.length, invalid: c.length, members: c.toJSON()}))
        }, oFooterHtml: '<a class="btn" D_ck="cancel">鍙栨秷</a><a class="btn btn_blue" D_ck="submit">纭畾</a>', sTitle: "鍒犻櫎鎴愬憳", oRules: {click: {cancel: function () {
            d.close()
        }, submit: function () {
            d.close(), n.deleteMembers(b, {success: function () {
                q.suc("鍒犻櫎鎴愬姛"), p.triggerParty("reload", n.getParty(a.options.partyid)), a.reset()
            }})
        }}}})
    }, onMoveMember: function () {
        var a = this, b = new h, c = new h;
        if (this.members.each(function (a) {
            n.isEditable(a) && b.add(a) || c.add(a)
        }), c.length)var d = $("<div>").MNDialog({sId: "MNDialog", sClass: "dialog_box", nTop: 20, nContentHeight: 100, oContentHtml: function (b) {
            var d = f.compile(['<div class="dialog_tip warning">', '<div class="tip_text">', '<div class="tip_text_title">浣犵‘瀹氳绉诲姩鎵€閫夌殑{{total}}浣嶆垚鍛樺悧锛�</div>', "{{if invalid > 0}}", '<div class="tip_text_detail">', '{{each members as member i}}{{if i <= 5}}<div class="group_item"><span class="group_item_name">{{member.username}}</span></div>{{/if}}{{/each}}', "</div>", "{{if invalid > 5}}绛墈{invalid}}浜簕{/if}}涓嶅湪绠＄悊鑼冨洿鍐咃紝涓嶄細琚Щ鍔�", "{{/if}}", "</div>", "</div>"].join(""));
            b(d({total: a.members.length, invalid: c.length, members: c.toJSON()}))
        }, oFooterHtml: '<a class="btn" D_ck="cancel">鍙栨秷</a><a class="btn btn_blue" D_ck="submit">纭畾</a>', sTitle: "绉诲姩鎴愬憳", oRules: {click: {cancel: function () {
            d.close()
        }, submit: function () {
            d.close(), a.moveMember(b)
        }}}}); else a.moveMember(b)
    }, moveMember: function (a) {
        var b = this, c = new j({mode: j.mode.move}), d = $("<div>").MNDialog({sId: "MNDialog", sClass: "dialog_box", nTop: 20, nContentHeight: 280, oContentHtml: function (a) {
            var b = $('<div class="tree_box"></div>').append(c.$el);
            a(b.eq(0)), c.render()
        }, oFooterHtml: '<a class="btn" D_ck="cancel">鍙栨秷</a><a class="btn btn_blue" D_ck="submit">纭畾</a>', sTitle: "璇烽€夋嫨浠庡睘閮ㄩ棬", oRules: {click: {cancel: function () {
            c.remove(), d.close()
        }, submit: function () {
            c.selected && n.moveMembers(a, c.selected, {success: function () {
                q.suc("绉诲姩鎴愬姛"), c.remove(), d.close(), p.triggerParty("reload", n.getParty(b.options.partyid)), b.reset()
            }})
        }}}})
    }, onInviteMember: function () {
        var a = "CORP_CERT_TYPE_AUTH" == window.settings.corp_type;
        if (a) {
            var b = [];
            this.members.each(function (a) {
                "MMOCBIZ_CONTACT_PENDING" == a.get("JoinStatus") && b.push(a.id)
            }), this.memberHandlerView.invite(b, {pending: b.length})
        } else this.inviteMember()
    }, inviteMember: function () {
        var a = new h;
        if (this.members.each(function (b) {
            "MMOCBIZ_CONTACT_PENDING" == b.get("JoinStatus") && a.add(b)
        }), 1 == a.length) {
            var b = a.at(0);
            if (b.get("email"))var c = $("<div>").MNDialog({sId: "MNDialog", sClass: "dialog_box", nTop: 20, nContentHeight: 100, oContentHtml: function (a) {
                var c = f.compile(['<div class="dialog_tip warning">', '<div class="tip_text">', '<div class="tip_text_title">鏄惁閫氳繃閭欢鍙戦€佷簩缁寸爜锛岄個璇峰鏂瑰叧娉紵</div>', "</div>", "</div>"].join(""));
                a(c(b.toJSON()))
            }, oFooterHtml: '<a class="btn btn_blue" D_ck="submit">鏄�</a><a class="btn" D_ck="cancel">鍚�</a>', sTitle: "閭€璇峰叧娉�", oRules: {click: {cancel: function () {
                c.close()
            }, submit: function () {
                n.inviteMembers(a, {success: function () {
                    q.suc("閭欢鍙戦€佹垚鍔�"), c.close()
                }})
            }}}}); else var c = $("<div>").MNDialog({sId: "MNDialog", sClass: "dialog_box", nTop: 20, nContentHeight: 100, oContentHtml: function (a) {
                var c = f.compile(['<div class="dialog_tip warning">', '<div class="tip_text">', '<div class="tip_text_title">{{username}}鏈缃偖绠憋紝鏃犳硶鍙戦€侀個璇烽偖浠�</div>', "</div>", "</div>"].join(""));
                a(c(b.toJSON()))
            }, oFooterHtml: '<a class="btn btn_blue" D_ck="submit">濂界殑</a>', sTitle: "閭€璇峰叧娉�", oRules: {click: {submit: function () {
                c.close()
            }}}})
        } else {
            var d = new h;
            if (a.each(function (a) {
                a.get("email") || d.add(a)
            }), d.length)var c = $("<div>").MNDialog({sId: "MNDialog", sClass: "dialog_box", nTop: 20, nContentHeight: 100, oContentHtml: function (b) {
                var c = f.compile(['<div class="dialog_tip warning">', '<div class="tip_text">', '<div class="tip_text_title">鏄惁閫氳繃閭欢鍙戦€佷簩缁寸爜锛岄個璇锋墍閫夌殑{{count}}浣嶆垚鍛樺叧娉紵</div>', '<div class="tip_text_detail">', '{{each members as member i}}{{if i <= 5}}<div class="group_item"><span class="group_item_name">{{member.username}}</span></div>{{/if}}{{/each}}', "</div>", "{{if noemail > 5}}绛墈{noemail}}浜簕{/if}}鏈缃偖绠憋紝鏃犳硶鍙戦€�", "</div>", "</div>"].join(""));
                b(c({count: a.length, members: d.toJSON(), noemail: d.length}))
            }, oFooterHtml: '<a class="btn btn_blue" D_ck="submit">鏄�</a><a class="btn" D_ck="cancel">鍚�</a>', sTitle: "閭€璇峰叧娉�", oRules: {click: {cancel: function () {
                c.close()
            }, submit: function () {
                n.inviteMembers(a, {success: function () {
                    q.suc("閭欢鍙戦€佹垚鍔�"), c.close()
                }})
            }}}}); else var c = $("<div>").MNDialog({sId: "MNDialog", sClass: "dialog_box", nTop: 20, nContentHeight: 100, oContentHtml: function (b) {
                var c = f.compile(['<div class="dialog_tip warning">', '<div class="tip_text">', '<div class="tip_text_title">鏄惁閫氳繃閭欢鍙戦€佷簩缁寸爜锛岄個璇锋墍閫夌殑{{count}}浣嶆垚鍛樺叧娉紵</div>', "</div>", "</div>"].join(""));
                b(c({members: a.length}))
            }, oFooterHtml: '<a class="btn btn_blue" D_ck="submit">鏄�</a><a class="btn" D_ck="cancel">鍚�</a>', sTitle: "閭€璇峰叧娉�", oRules: {click: {cancel: function () {
                c.close()
            }, submit: function () {
                n.inviteMembers(a, {success: function () {
                    q.suc("閭欢鍙戦€佹垚鍔�"), c.close()
                }})
            }}}})
        }
    }, onSetMemberTop: function (a) {
        var b = this, c = $(a.target), d = c.data("partyid"), e = this.members.first(), f = !e.get("istop"), g = e.get("username"), h = e.get("bizmpid");
        c.html("鎻愪氦涓�").addClass("disabled").prop("disabled", !0), n.setMemberTop({member: e, partyid: d, isSetTop: f, username: g, bizmpid: h, callBack: function () {
            c.html(f ? "鍙栨秷缃《" : "缃《"), c.removeClass("disabled").prop("disabled", !1), p.triggerParty("reload", n.getParty(b.options.partyid), {keepPicker: !0})
        }})
    }, addTagMember: function () {
        var a = this;
        this.contactInputView ? this.contactInputView.clear().render() : n.ready(function () {
            a.contactInputView = new o({tokens: n.getTokens("member").concat(n.getTokens("party")), nodes: {pids: n.getNodes("party"), tags: []}, tabs: {uins: !0, pids: !0}, onSubmit: function (b) {
                var c = new g;
                $.each(b.pids, function (a, b) {
                    var d = n.getParty(b);
                    d && c.add(d)
                });
                var d = new h;
                $.each(b.uins, function (a, b) {
                    var c = n.getMember(b);
                    c && d.add(c)
                });
                var e = n.getTag(a.options.tagid);
                return c.length + d.length ? n.addTagMember(e, c, d, {success: function () {
                    q.suc("鎴愬姛娣诲姞鏍囩鎴愬憳"), a.contactInputView.close()
                }}) : q.err("璇烽€夋嫨鎴愬憳"), !1
            }}), a.contactInputView.render()
        })
    }, onDeleteTagMember: function () {
        var a = n.getTag(this.options.tagid);
        n.delTagMember(a, this.parties, this.members, {success: function () {
            q.suc("鎴愬姛绉诲嚭鏍囩鎴愬憳")
        }})
    }, onReviewOperlog: function () {
        this.render({operlog: !0, reset: !1})
    }, showMemberPopover: function (a, b) {
        a.stopPropagation();
        var c = this, d = $(a.target).closest("li"), e = d.find("img"), f = d.attr("uin"), g = this.selecteds.get(f);
        if ($("#memberPopover").remove(), g) {
            var h = k, i = new h({model: g, style: h.style.card});
            i.render().$el.hide().appendTo("body"), i.$el.attr("id", "memberPopover").addClass("member_popover").css({top: e.offset().top + e.height() / 2 + i.$el.height() < $(window).height() && e.offset().top + e.height() / 2 || e.offset().top + e.height() / 2 - i.$el.height(), left: e.offset().left + e.width() / 2 - i.$el.width()}).fadeIn(300).hover(function () {
                b.$el.data("hover", !0)
            }, function (a) {
                b.$el.data("hover", !1), setTimeout(function () {
                    b.$el.data("hover") || c.hideMemberPopover(a)
                }, 10)
            })
        }
    }, hideMemberPopover: function (a) {
        a.stopPropagation(), $("#memberPopover").remove()
    }, showMenu: function (a) {
        var b = this.menu;
        if (!b) {
            var c = this.$el.find(".js_menu_list");
            b = new r(c), c.delegate("li", "click", this, function (a) {
                var c = a.data, d = $(a.currentTarget), e = d.parent().children().index(d);
                switch (b.hide(), e) {
                    case 0:
                        c.onMoveMember();
                        break;
                    case 1:
                        c.onDeleteMember();
                        break;
                    case 2:
                        c.onReviewOperlog()
                }
            })
        }
        b.show({top: $(a.currentTarget).offset().top - b.$container.height(), left: $(a.currentTarget).offset().left + $(a.currentTarget).outerWidth() - b.$container.outerWidth(), delay: 2e3}), this.menu = b
    }});
    t.mode = s, c.exports = t
});