import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "dm-signup-redirect-to-insider",
  initialize() {
    withPluginApi((api) => {
      const siteSettings = api.container.lookup("service:site-settings");
      if (siteSettings.enable_local_logins) {
        return;
      }

      document.addEventListener(
        "click",
        (event) => {
          const signUpButton = event.target.closest(".sign-up-button");
          if (!signUpButton) {
            return;
          }

          event.preventDefault();
          event.stopImmediatePropagation();
          window.open(settings.sign_up_redirect_url, "_blank");
        },
        { capture: true }
      );
    });
  },
};
