import { updateUser } from '@/services/api';
import type { UserVO, UserUpdateAO, UserAddAO } from '@/services/types';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message, Modal } from 'antd';
import React, { useMemo } from 'react';

interface Props {
  oldData?: UserVO;
  visible: boolean;
  columns: ProColumns<UserVO>[];
  onSubmit: (values: UserUpdateAO) => void;
  onCancel: () => void;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: UserUpdateAO) => {
  const hide = message.loading('正在更新');
  try {
    await updateUser(fields);
    hide();
    message.success('更新成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('更新失败，' + error.message);
    return false;
  }
};

/**
 * 更新弹窗
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) => {
  const { oldData, visible, columns, onSubmit, onCancel } = props;

  // 过滤掉 userAccount 字段，不允许修改账号
  const formColumns = useMemo(() => {
    return columns.filter((col) => col.dataIndex !== 'userAccount');
  }, [columns]);

  if (!oldData) {
    return <></>;
  }

  return (
    <Modal
      destroyOnClose
      title={'更新'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        key={oldData.id}
        type="form"
        columns={formColumns}
        form={{
          initialValues: oldData,
        }}
        onSubmit={async (values: UserAddAO) => {
          const success = await handleUpdate({
            ...values,
            id: oldData.id,
          });
          if (success) {
            onSubmit?.(values);
          }
        }}
        submitter={{
          render: (props, defaultDoms) => {
            return [
              <Button key="cancel" onClick={() => onCancel?.()}>
                取消
              </Button>,
              <Button key="submit" type="primary" onClick={() => props.submit?.()}>
                确定
              </Button>,
            ];
          },
        }}
      />
    </Modal>
  );
};
export default UpdateModal;
