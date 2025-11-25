import { getOwner } from "@ember/owner";
import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "dm-signup-redirect-to-insider",
  initialize() {
    withPluginApi((api) => {
      api.modifyClass("route:signup", {
        pluginId: "dm-signup-redirect-to-insider",

        beforeModel(transition) {
          const siteSettings = getOwner(this).lookup("service:site-settings");
          const sso_enabled = !siteSettings.enable_local_logins;

          if (sso_enabled) {
            transition.abort();
            window.open(settings.sign_up_redirect_url, "_blank");
            return;
          }

          this._super(...arguments);
        },
      });
    });
  },
};
