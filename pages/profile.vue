<script setup lang="ts">
import { useNotification } from 'naive-ui';
import type { UploadFileInfo } from 'naive-ui';

const auth = useAuthStore();
const notification = useNotification();

const basicInformation = ref({
    username: auth.info.username,
    email: auth.info.email,
});

const updateBasicInformation = async () => {
    const result = await $fetch('/api/user/basic', {
        method: 'POST',
        body: basicInformation.value
    })

    if (result.status === 200) {
        notification.success({
            title: 'Success',
            description: 'Basic information updated successfully!'
        })
        await auth.fetch()
    } else {
        notification.error({
            title: 'Error',
            description: 'Failed to update basic information!'
        })
    }
};

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

const updatePassword = async () => {
    if (password.value.newPassword !== password.value.retypeNewPassword) {
        notification.error({
            title: 'Error',
            description: 'New password does not match!'
        })
        return
    }

    const result = await $fetch('/api/user/password', {
        method: 'POST',
        body: password.value
    })

    if (result.status === 200) {
        notification.success({
            title: 'Success',
            description: 'Password updated successfully!'
        })
    } else {
        notification.error({
            title: 'Error',
            description: 'Failed to update password!'
        })
    }
};

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

const updateAddress = async () => {
    const result = await $fetch('/api/user/shipping', {
        method: 'POST',
        body: address.value
    })

    if (result.status === 200) {
        await auth.fetch()
        notification.success({
            title: 'Success',
            description: 'Address updated successfully!'
        })
    } else {
        notification.error({
            title: 'Error',
            description: 'Failed to update address!'
        })
    }
};

const uploadAvatar = async ({
    file,
    event
}: {
    file: UploadFileInfo
    event?: ProgressEvent
}) => {
    const res = JSON.parse((event?.target as XMLHttpRequest).response);
    if (res.status === 200) {
        const upload = await $fetch('/api/user/avatar', {
            method: 'POST',
            body: {
                avatar: res.data.url
            }
        })

        if (upload.status === 200) {
            notification.success({
                title: 'Success',
                description: 'Avatar uploaded successfully!'
            })
            auth.info.avatar = res.data.url
        } else {
            notification.error({
                title: 'Error',
                description: 'Failed to upload avatar!'
            })
        }
    } else {
        notification.error({
            title: 'Error',
            description: 'Failed to upload avatar!'
        })
    }
}
</script>

<template>
    <n-layout has-sider>
        <n-layout-sider content-style="padding: 10px;" width="350">
            <n-avatar round :size="330"
                :src="auth.info.avatar || 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'" />
            <div class="h-5"></div>
            <div width="330" class="flex flex-col">
                <n-upload abstract action="/api/upload" @finish="uploadAvatar">
                    <n-button-group>
                        <n-upload-trigger #="{ handleClick }" abstract>
                            <n-button type="info" @click="handleClick" class="w-full">Upload New Avatar</n-button>
                        </n-upload-trigger>
                    </n-button-group>
                    <n-upload-file-list class="hidden" />
                </n-upload>
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
                        <n-form :rules="basicInformationRules" :model="basicInformation" label-placement="top">
                            <n-grid :cols="24" :x-gap="24">
                                <n-form-item-gi :span="12" label="Username" path="username">
                                    <n-input v-model:value="basicInformation.username" placeholder="" />
                                </n-form-item-gi>
                                <n-form-item-gi :span="12" label="E-mail" path="email">
                                    <n-input v-model:value="basicInformation.email" placeholder="" />
                                </n-form-item-gi>
                            </n-grid>
                        </n-form>
                    </div>
                    <div class="h-1"></div>
                    <n-button type="info" @click="updateBasicInformation">Submit</n-button>
                    <n-divider />
                    <div class="text-xl">Change Password</div>
                    <div class="h-4"></div>
                    <div>
                        <n-grid :cols="24" :x-gap="24">
                            <n-form-item-gi :span="24" label="Old Password" path="inputValue">
                                <n-input v-model:value="password.oldPassword" placeholder="" type="password" />
                            </n-form-item-gi>
                            <n-form-item-gi :span="24" label="New Password" path="inputValue">
                                <n-input v-model:value="password.newPassword" placeholder="" type="password" />
                            </n-form-item-gi>
                            <n-form-item-gi :span="24" label="Retype New Password" path="inputValue">
                                <n-input v-model:value="password.retypeNewPassword" placeholder="" type="password" />
                            </n-form-item-gi>
                        </n-grid>
                    </div>
                    <div class="h-1"></div>
                    <n-button type="info" @click="updatePassword">Submit</n-button>
                    <n-divider />
                    <div class="text-xl">Shipping Address</div>
                    <div class="h-4"></div>
                    <div>
                        <n-form :rules="addressRules" :model="address" label-placement="top">
                            <n-grid :cols="24" :x-gap="24">
                                <n-form-item-gi :span="24" label="Name" path="name">
                                    <n-input v-model:value="address.name" placeholder="" />
                                </n-form-item-gi>
                                <n-form-item-gi :span="24" label="Phone Number" path="phone">
                                    <n-input v-model:value="address.phone" placeholder="" />
                                </n-form-item-gi>
                                <n-form-item-gi :span="24" label="Address" path="address">
                                    <n-input v-model:value="address.address" placeholder="" />
                                </n-form-item-gi>
                            </n-grid>
                        </n-form>
                    </div>
                    <div class="h-1"></div>
                    <n-button type="info" @click="updateAddress">Submit</n-button>
                    <n-divider />
                </div>
            </n-layout-content>
            <n-layout-footer></n-layout-footer>
        </n-layout>
    </n-layout>
</template>
