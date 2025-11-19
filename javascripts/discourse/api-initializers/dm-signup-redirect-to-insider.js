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
          const enable_discourse_connect =
            siteSettings.enable_discourse_connect;

          if (enable_discourse_connect) {
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
