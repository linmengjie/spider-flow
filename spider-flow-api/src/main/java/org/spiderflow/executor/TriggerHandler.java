package org.spiderflow.executor;

/**
 * 触发方法实现的逻辑
 * Created on 2019-12-26
 *
 * @author Octopus
 */
public interface TriggerHandler {

    void loadMessage(String message);
}
