<script setup lang="ts">
import type { User } from "@prisma/client";
import { NAvatar } from "naive-ui";
import type { DataTableColumns } from "naive-ui";

const props = defineProps<{
  user: User[];
}>();

const createColumns = ({
  play,
}: {
  play: (row: User) => void;
}): DataTableColumns<User> => {
  return [
    {
      title: "No",
      key: "id",
      resizable: true,
    },
    {
      title: "Avatar",
      key: "avatar",
      resizable: true,
      render(row) {
        return h(
          NAvatar,
          {
            round: true,
            src: row.avatar
          },
        );
      },
    },
    {
      title: "Username",
      key: "username",
      resizable: true,
    },
    {
      title: "E-mail",
      key: "email",
      resizable: true,
    },
    {
      title: "Name",
      key: "name",
      resizable: true,
    },
    {
      title: "Phone",
      key: "phone",
      resizable: true,
    },
    {
      title: "Address",
      key: "address",
      resizable: true,
    },
  ];
};

const columns = createColumns({
    play(row: User) {

    }
})
</script>

<template>
<n-data-table
    :columns="columns"
    :data="user"
    :bordered="false"
  />
</template>
