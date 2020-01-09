package org.spiderflow.executor;

/**
 * 触发Executor需要实现的接口
 * Created on 2019-12-26
 * @author Octopus
 */
public interface TriggerExecutor {

    /**
     * 触发执行方法
     * @param handler
     */
    void handlerMessage(TriggerHandler handler);
}
