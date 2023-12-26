<script setup lang="ts">
const auth = useAuthStore();

const basicInformation = ref({
  username: auth.info.username,
  email: auth.info.email,
});

const basicInformationRules = ref({
  username: {
    required: true,
    message: "Please input username!",
    trigger: "blur",
  },
  email: {
    required: true,
    message: "Please input email!",
    trigger: "blur",
  },
});

const password = ref({
  oldPassword: null,
  newPassword: null,
  retypeNewPassword: null,
});

const address = ref({
  name: auth.info.name,
  phone: auth.info.phone,
  address: auth.info.address,
});

const addressRules = ref({
  name: {
    required: true,
    message: "Please input name!",
    trigger: "blur",
  },
  phone: {
    required: true,
    message: "Please input phone number!",
    trigger: "blur",
  },
  address: {
    required: true,
    message: "Please input address!",
    trigger: "blur",
  },
});
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider content-style="padding: 10px;" width="350">
      <n-avatar
        round
        :size="330"
        :src="auth.info.avatar || 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'"
      />
      <div class="h-5"></div>
      <div width="330" class="flex flex-col">
        <n-button type="info"> Upload New Avatar </n-button>
      </div>
    </n-layout-sider>
    <n-layout>
      <n-layout-header> </n-layout-header>
      <n-layout-content>
        <div class="pl-10">
          <div class="text-3xl font-semibold">Profile</div>
          <div class="text-xl">Hi, {{ auth.info.name }}</div>
          <n-divider />
          <div class="text-xl">Basic Information</div>
          <div class="h-4"></div>
          <div>
            <n-form
              :rules="basicInformationRules"
              :model="basicInformation"
              label-placement="top"
            >
              <n-grid :cols="24" :x-gap="24">
                <n-form-item-gi
                  :span="12"
                  label="Username"
                  path="username"
                >
                  <n-input
                    v-model:value="basicInformation.username"
                    placeholder=""
                  />
                </n-form-item-gi>
                <n-form-item-gi
                  :span="12"
                  label="E-mail"
                  path="email"
                >
                  <n-input
                    v-model:value="basicInformation.email"
                    placeholder=""
                  />
                </n-form-item-gi>
              </n-grid>
            </n-form>
          </div>
          <div class="h-1"></div>
          <n-button type="info"> Submit </n-button>
          <n-divider />
          <div class="text-xl">Change Password</div>
          <div class="h-4"></div>
          <div>
            <n-grid :cols="24" :x-gap="24">
              <n-form-item-gi :span="24" label="Old Password" path="inputValue">
                <n-input v-model:value="password.oldPassword" placeholder="" />
              </n-form-item-gi>
              <n-form-item-gi :span="24" label="New Password" path="inputValue">
                <n-input v-model:value="password.newPassword" placeholder="" />
              </n-form-item-gi>
              <n-form-item-gi
                :span="24"
                label="Retype New Password"
                path="inputValue"
              >
                <n-input
                  v-model:value="password.retypeNewPassword"
                  placeholder=""
                />
              </n-form-item-gi>
            </n-grid>
          </div>
          <div class="h-1"></div>
          <n-button type="info"> Submit </n-button>
          <n-divider />
          <div class="text-xl">Shipping Address</div>
          <div class="h-4"></div>
          <div>
            <n-form :rules="addressRules" :model="address" label-placement="top">
              <n-grid :cols="24" :x-gap="24">
                <n-form-item-gi :span="24" label="Name" path="name">
                  <n-input v-model:value="address.name" placeholder="" />
                </n-form-item-gi>
                <n-form-item-gi
                  :span="24"
                  label="Phone Number"
                  path="phone"
                >
                  <n-input v-model:value="address.phone" placeholder="" />
                </n-form-item-gi>
                <n-form-item-gi
                  :span="24"
                  label="Address"
                  path="address"
                >
                  <n-input v-model:value="address.address" placeholder="" />
                </n-form-item-gi>
              </n-grid>
            </n-form>
          </div>
          <div class="h-1"></div>
          <n-button type="info"> Submit </n-button>
          <n-divider />
        </div>
      </n-layout-content>
      <n-layout-footer></n-layout-footer>
    </n-layout>
  </n-layout>
</template>
